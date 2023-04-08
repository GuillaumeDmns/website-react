import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Body from "components/body";
import { IRootState } from "store/types";
import { IDFMStopArea, LinesDTO, StopsByLineDTO, UnitIDFMDTO } from "api/api.types";
import LoginDialog from "components/dialog";
import OpenStreetMap from "components/openstreetmap";
import TransportModesList from "components/idfm/TransportModesList";
import LinesList from "components/idfm/LinesList";
import StopsList from "components/idfm/StopsList";
import Timetable from "components/idfm/Timetable";

dayjs.extend(relativeTime);
dayjs.locale("fr");

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [linesDTO, setLinesDTO] = useState<LinesDTO | null>(null);
  const [stopsDTO, setStopsDTO] = useState<StopsByLineDTO | null>(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = React.useState<IDFMStopArea | null>(null);
  const [unitIDFMDTO, setUnitIDFMDTO] = React.useState<UnitIDFMDTO | null>(null);

  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  return (
    <Body>
      {isAuthenticated ? (
        <Grid container direction="column" spacing={1} alignItems="center">
          <TransportModesList
            lines={linesDTO}
            selectedTransportMode={selectedTransportMode}
            setLines={setLinesDTO}
            setSelectedTransportMode={setSelectedTransportMode}
            setSelectedLine={setSelectedLine}
            setSelectedStop={setSelectedStop}
          />
          <LinesList
            lines={linesDTO}
            selectedTransportMode={selectedTransportMode}
            selectedLine={selectedLine}
            setStops={setStopsDTO}
            setSelectedLine={setSelectedLine}
            setSelectedStop={setSelectedStop}
          />
          <StopsList
            stops={stopsDTO}
            selectedStop={selectedStop}
            selectedLine={selectedLine}
            selectedTransportMode={selectedTransportMode}
            setSelectedStop={setSelectedStop}
            setUnitIDFM={setUnitIDFMDTO}
          />
          <Timetable
            selectedTransportMode={selectedTransportMode}
            selectedLine={selectedLine}
            selectedStop={selectedStop}
            unitIDFM={unitIDFMDTO}
          />
          <Grid item container justifyContent="center">
            <Grid item>
              <OpenStreetMap />
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
