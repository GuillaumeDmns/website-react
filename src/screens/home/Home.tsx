import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import Body from "components/body";
import action from "store/actions";
import { IRootState } from "store/types";
import { IDFMLine, LinesDTO } from "api/api.types";
import api from "api/api";
import LoginDialog from "components/dialog";

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

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [linesDTO, setLinesDTO] = useState<LinesDTO | null>(null);

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

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  const handleLogout = () => {
    dispatch(action.authentication.logoutUser());
  };

  return (
    <Body>
      {isAuthenticated ? (
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item>
            {linesDTO?.lines &&
              Object.keys(linesDTO.lines).map((key: string) => (
                <div id={key}>
                  <div>
                    {key} ({(linesDTO?.count && linesDTO.count[key]) || 0})
                  </div>
                  <div>{linesDTO?.lines && linesDTO.lines[key].map((idfmLine: IDFMLine) => <p id={idfmLine.id}>{idfmLine.name}</p>)}</div>
                </div>
              ))}
          </Grid>
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <Button size="medium" variant="outlined" color="primary" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <MainMapContainer ref={mapContainer} className="map-container" />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Button size="medium" variant="outlined" color="primary" onClick={handleClickOpenLoginDialog}>
          Se connecter
        </Button>
      )}

      <LoginDialog loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} />
    </Body>
  );
};

export default Home;
