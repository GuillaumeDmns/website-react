import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Autocomplete, ButtonGroup, Grid, TextField } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import Body from "components/body";
import action from "store/actions";
import { IRootState } from "store/types";
import { CallUnit, IDFMLine, IDFMStopArea, LinesDTO, StopsByLineDTO, UnitIDFMDTO } from "api/api.types";
import api from "api/api";
import LoginDialog from "components/dialog";
import LineImage from "components/line/LineImage";
import { naturalSorter } from "utils/line.utils";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

dayjs.extend(relativeTime);
dayjs.locale("fr");
mapboxgl.accessToken = "pk.eyJ1IjoiZ3VpbGxhdW1lZG1ucyIsImEiOiJja3Y5ejdtYjMwYTJuMzFwZ292eTZtbHE5In0.d3ZU8GezLxJHmfZsfYgqbw";

const MainMapContainer = styled.div`
  height: 500px;
  width: 800px;
`;

const AtStop = styled.span`
  border: 2px solid black;
  font-weight: bold;
  padding: 2px;
`;

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [linesDTO, setLinesDTO] = useState<LinesDTO | null>(null);
  const [stopsDTO, setStopsDTO] = useState<StopsByLineDTO | null>(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = React.useState<IDFMStopArea | null>(null);
  const [unitIDFMDTO, setUnitIDFMDTO] = React.useState<UnitIDFMDTO | null>(null);

  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const dispatch = useDispatch();

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng] = useState(2.349014);
  const [lat] = useState(48.864716);
  const [zoom] = useState(11);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    (async function loadLines() {
      if (isAuthenticated) {
        try {
          const response = await api.idfm.getLines();
          if (response?.data?.count && Object.keys(response.data.count).length > 0) {
            setLinesDTO(response.data);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    (async function loadStops() {
      if (selectedTransportMode && selectedLine) {
        try {
          const response = await api.idfm.getStopsByLine(selectedLine);
          if (response && response.data && response.data.stops) {
            setStopsDTO(response.data);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [selectedTransportMode, selectedLine]);

  useEffect(() => {
    (async function loadNextPassages() {
      if (selectedTransportMode && selectedLine && selectedStop && selectedStop.id) {
        try {
          const response = await api.idfm.getStopNextPassage(selectedStop.id, selectedLine);
          if (response && response.data && response.data.nextPassages) {
            setUnitIDFMDTO(response.data);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [selectedTransportMode, selectedLine, selectedStop]);

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  const handleLogout = () => {
    dispatch(action.authentication.logoutUser());
  };

  const handleChangeTransportMode = (transportMode: string) => {
    setSelectedStop(null);
    setSelectedLine(null);
    setSelectedTransportMode(transportMode);
  };

  const handleChangeLine = (lineId?: string) => {
    if (lineId) {
      setSelectedStop(null);
      setStopsDTO(null);
      setSelectedLine(lineId === selectedLine ? null : lineId);
    }
  };

  return (
    <Body>
      {isAuthenticated ? (
        <Grid container direction="column" spacing={1} alignItems="center">
          {linesDTO?.lines && (
            <ButtonGroup size="large" aria-label="large button group">
              {" "}
              {Object.keys(linesDTO.lines).map((key: string) => (
                <Button
                  key={key}
                  variant={key === selectedTransportMode ? "outlined" : "contained"}
                  onClick={() => handleChangeTransportMode(key)}
                >
                  {key} ({(linesDTO?.count && linesDTO.count[key]) || 0})
                </Button>
              ))}
            </ButtonGroup>
          )}
          {selectedTransportMode && (
            <Grid container justifyContent="center" alignItems="center">
              {linesDTO?.lines &&
                linesDTO.lines[selectedTransportMode].sort(naturalSorter).map((idfmLine: IDFMLine) => (
                  <Grid key={idfmLine.id} item onClick={() => handleChangeLine(idfmLine.id)}>
                    <LineImage line={idfmLine} isUnselected={selectedLine != null && idfmLine.id !== selectedLine} />
                  </Grid>
                ))}
            </Grid>
          )}

          {selectedTransportMode && selectedLine && (
            <Grid container justifyContent="center" alignItems="center">
              <Autocomplete
                value={selectedStop}
                onChange={(event: React.SyntheticEvent, newSelectedStop: IDFMStopArea | null) => {
                  setSelectedStop(newSelectedStop);
                }}
                style={{ width: 300 }}
                size="small"
                options={stopsDTO?.stops || ([] as Array<IDFMStopArea>)}
                autoHighlight
                getOptionLabel={(stop: IDFMStopArea) => stop.name || ""}
                renderInput={(params) => <TextField {...params} label="Choisissez un arrêt" variant="outlined" />}
              />
            </Grid>
          )}

          {selectedTransportMode &&
            selectedLine &&
            selectedStop &&
            unitIDFMDTO &&
            unitIDFMDTO.nextPassages &&
            unitIDFMDTO.nextPassageDestinations && (
              <Grid item container spacing={5} alignItems="center" justifyContent="center">
                {unitIDFMDTO.nextPassages.length > 0 && unitIDFMDTO.nextPassageDestinations.length > 0 ? (
                  unitIDFMDTO.nextPassageDestinations.map((direction) => (
                    <Grid id={direction} item>
                      <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                          Direction <b>{direction}</b> :
                        </Grid>
                        <Grid item container direction="column" spacing={2} alignItems="center">
                          {unitIDFMDTO?.nextPassages
                            ?.filter((passage: CallUnit) => passage.destinationDisplay === direction)
                            .map((passage: CallUnit) => (
                              <Grid
                                key={`${passage.destinationDisplay}-${passage.expectedDepartureTime}-${passage.expectedArrivalTime}-`}
                                item
                              >
                                {dayjs(
                                  passage.expectedDepartureTime ?? passage.aimedDepartureTime ?? passage.expectedArrivalTime,
                                  "YYYYMMDDHHmm"
                                ).fromNow()}{" "}
                                (
                                {dayjs(passage.expectedDepartureTime ?? passage.aimedDepartureTime ?? passage.expectedArrivalTime).format(
                                  "HH:mm"
                                )}
                                ) {passage.vehicleAtStop && <AtStop>À L&apos;ARRÊT</AtStop>}
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <p>Pas de prochains départs prévus !</p>
                )}
              </Grid>
            )}
          <Grid item container justifyContent="center">
            <Grid item>
              <Button size="medium" variant="outlined" color="primary" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            <Grid item>
              <MainMapContainer ref={mapContainer} className="map-container" />
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
