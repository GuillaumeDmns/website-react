import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Body from "components/body";
import { IRootState } from "store/types";
import { IDFMStopArea, LineDTO, LinesDTO, StopsByLineDTO, UnitIDFMDTO } from "api/api.types";
import LoginDialog from "components/dialog";
import OpenStreetMapContainer from "components/openstreetmap/OpenStreetMapContainer";
import TransportModesList from "components/idfm/TransportModesList";
import LinesList from "components/idfm/LinesList";
import StopsList from "components/idfm/StopsList";
import Timetable from "components/idfm/Timetable";
import api from "../../api/api.ts";
import useFetch from "../../hooks/useFetch.ts";

dayjs.extend(relativeTime);
dayjs.locale("fr");

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [linesDTO, setLinesDTO] = useState<LinesDTO | null>(null);
  const [stopsDTO, setStopsDTO] = useState<StopsByLineDTO | null>(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState<string | null>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = React.useState<IDFMStopArea | null>(null);
  const [unitIDFMDTO, setUnitIDFMDTO] = React.useState<UnitIDFMDTO | null>(null);

  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);
  const selectedLine: LineDTO | undefined =
    (selectedTransportMode &&
      linesDTO &&
      linesDTO.lines &&
      linesDTO.lines[selectedTransportMode].find((line) => line.id === selectedLineId)) ||
    undefined;

  const [loadingNextPassages, getNextPassages] = useFetch((stopId: number, lineId: string) => api.idfm.getStopNextPassage(stopId, lineId));

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  const loadNextPassages = useCallback(async () => {
    if (selectedTransportMode && selectedLineId && selectedStop && selectedStop.id) {
      const response = await getNextPassages(selectedStop.id, selectedLineId);
      if (response?.data?.nextPassages) {
        setUnitIDFMDTO(response.data);
      }
    }
  }, [selectedTransportMode, selectedLineId, selectedStop, setUnitIDFMDTO]);

  useEffect(() => {
    loadNextPassages().catch(console.error);
    console.log()
  }, [loadNextPassages, selectedTransportMode, selectedLine, selectedStop]);

  return (
    <Body>
      {isAuthenticated ? (
        <Grid container direction="column" spacing={1} alignItems="center">
          <TransportModesList
            lines={linesDTO}
            selectedTransportMode={selectedTransportMode}
            setLines={setLinesDTO}
            setSelectedTransportMode={setSelectedTransportMode}
            setSelectedLine={setSelectedLineId}
            setSelectedStop={setSelectedStop}
          />
          <LinesList
            lines={linesDTO}
            selectedTransportMode={selectedTransportMode}
            selectedLine={selectedLineId}
            setStops={setStopsDTO}
            setSelectedLine={setSelectedLineId}
            setSelectedStop={setSelectedStop}
          />
          <StopsList
            stops={stopsDTO}
            selectedStop={selectedStop}
            selectedLine={selectedLineId}
            selectedTransportMode={selectedTransportMode}
            setSelectedStop={setSelectedStop}
            loadNextPassages={loadNextPassages}
          />
          <Timetable
            selectedTransportMode={selectedTransportMode}
            selectedLine={selectedLineId}
            selectedStop={selectedStop}
            unitIDFM={unitIDFMDTO}
            loadingNextPassages={loadingNextPassages}
          />
          <Grid item container justifyContent="center">
            <Grid item>
              <OpenStreetMapContainer
                stopsByLine={stopsDTO}
                selectedStop={selectedStop}
                selectedLine={selectedLine}
                setSelectedStop={setSelectedStop}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" spacing={4} alignItems="center">
          <Grid item>Connectez-vous pour accéder au contenu</Grid>
          <Grid item container justifyContent="center" spacing={2}>
            <Button size="medium" variant="outlined" color="primary" onClick={handleClickOpenLoginDialog}>
              Se connecter
            </Button>
          </Grid>
        </Grid>
      )}

      <LoginDialog loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} />
    </Body>
  );
};

export default Home;
