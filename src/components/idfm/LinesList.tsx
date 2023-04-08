import React, { useEffect } from "react";
import { Grid } from "@mui/material";

import { IDFMLine, IDFMStopArea, LinesDTO, StopsByLineDTO } from "api/api.types";
import { naturalSorter } from "utils/line.utils";
import api from "api/api";
import LineImage from "../line";

type Props = {
  lines: LinesDTO | null;
  selectedTransportMode: string | null;
  selectedLine: string | null;
  setStops: React.Dispatch<React.SetStateAction<StopsByLineDTO | null>>;
  setSelectedLine: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
};

const LinesList: React.FC<Props> = ({ lines, setStops, selectedLine, selectedTransportMode, setSelectedLine, setSelectedStop }: Props) => {
  useEffect(() => {
    (async function loadStops() {
      if (selectedTransportMode && selectedLine) {
        try {
          const response = await api.idfm.getStopsByLine(selectedLine);
          if (response && response.data && response.data.stops) {
            setStops(response.data);
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e);
        }
      }
    })();
  }, [selectedTransportMode, selectedLine, setStops]);

  const handleChangeLine = (lineId?: string) => {
    if (lineId) {
      setSelectedStop(null);
      setStops(null);
      setSelectedLine(lineId === selectedLine ? null : lineId);
    }
  };

  return selectedTransportMode ? (
    <Grid container justifyContent="center" alignItems="center">
      {lines?.lines &&
        lines.lines[selectedTransportMode].sort(naturalSorter).map((idfmLine: IDFMLine) => (
          <Grid key={idfmLine.id} item onClick={() => handleChangeLine(idfmLine.id)}>
            <LineImage line={idfmLine} isUnselected={selectedLine != null && idfmLine.id !== selectedLine} />
          </Grid>
        ))}
    </Grid>
  ) : null;
};

export default LinesList;
