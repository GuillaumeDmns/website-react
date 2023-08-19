import * as React from "react";
import { Grid } from "@mui/material";
import { CallUnit, IDFMStopArea, UnitIDFMDTO } from "api/api.types";
import dayjs from "dayjs";
import styled from "styled-components";

const NextPassage = styled.span`
  margin: 5px;
`;

const AtStop = styled.span`
  border: 2px solid black;
  font-weight: bold;
  padding: 2px;
`;

type Props = {
  selectedTransportMode: string | null;
  selectedLine: string | null;
  selectedStop: IDFMStopArea | null;
  unitIDFM: UnitIDFMDTO | null;
};

const Timetable: React.FC<Props> = ({ selectedTransportMode, selectedLine, selectedStop, unitIDFM }: Props) => {
  return selectedTransportMode && selectedLine && selectedStop && unitIDFM && unitIDFM.nextPassages && unitIDFM.nextPassageDestinations ? (
    <Grid item container spacing={2} justifyContent="center">
      {unitIDFM.nextPassages.length > 0 && unitIDFM.nextPassageDestinations.length > 0 ? (
        unitIDFM.nextPassageDestinations.map((direction) => (
          <Grid key={direction} id={direction} xs={12} md={6} lg={4} item>
            <Grid container spacing={1} direction="column">
              <Grid item style={{ textAlign: "center" }}>
                Direction <b>{direction}</b> :
              </Grid>
              <Grid item container direction="column" alignItems="center">
                {unitIDFM?.nextPassages
                  ?.filter((passage: CallUnit) => passage.destinationDisplay === direction)
                  .map((passage: CallUnit) => (
                    <NextPassage key={`${passage.destinationDisplay}-${passage.expectedDepartureTime}-${passage.expectedArrivalTime}-`}>
                      {dayjs(
                        passage.expectedDepartureTime ?? passage.aimedDepartureTime ?? passage.expectedArrivalTime,
                        "YYYYMMDDHHmm"
                      ).fromNow()}{" "}
                      ({dayjs(passage.expectedDepartureTime ?? passage.aimedDepartureTime ?? passage.expectedArrivalTime).format("HH:mm")}){" "}
                      {passage.vehicleAtStop && <AtStop>À L&apos;ARRÊT</AtStop>}
                    </NextPassage>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : (
        <p>Pas de prochains départs prévus !</p>
      )}
    </Grid>
  ) : null;
};

export default Timetable;
