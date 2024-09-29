import React, { useEffect } from "react";
import { Box } from "@mui/material";

import { IDFMStopArea, LineDTO, LinesDTO, StopsByLineDTO } from "api/api.types";
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
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1, mb: 4 }}>
      {lines?.lines &&
        lines.lines[selectedTransportMode].sort(naturalSorter).map((lineDTO: LineDTO) => (
          <Box 
            key={lineDTO.id} 
            onClick={() => handleChangeLine(lineDTO.id)}
            sx={{ 
              transition: "transform 0.2s", 
              cursor: "pointer",
              "&:hover": { transform: "scale(1.1)" }
            }}
          >
            <LineImage line={lineDTO} isUnselected={selectedLine != null && lineDTO.id !== selectedLine} />
          </Box>
        ))}
    </Box>
  ) : null;
};

export default LinesList;
