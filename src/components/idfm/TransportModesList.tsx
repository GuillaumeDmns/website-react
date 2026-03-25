import * as React from "react";
import { Box, Chip } from "@mui/material";

import { IDFMStopArea, LinesDTO } from "api/api.types";
import { useEffect } from "react";
import api from "api/api";
import { useSelector } from "react-redux";
import { IRootState } from "store/types";

type Props = {
  lines: LinesDTO | null;
  selectedTransportMode: string | null;
  setLines: React.Dispatch<React.SetStateAction<LinesDTO | null>>;
  setSelectedTransportMode: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedLine: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
};

const TransportModesList: React.FC<Props> = ({
  lines,
  selectedTransportMode,
  setLines,
  setSelectedLine,
  setSelectedStop,
  setSelectedTransportMode,
}: Props) => {
  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  useEffect(() => {
    (async function loadLines() {
      if (isAuthenticated) {
        try {
          const response = await api.idfm.getLines();
          if (response?.data?.count && Object.keys(response.data.count).length > 0) {
            setLines(response.data);
          }
        } catch (error) {
          console.error("Error loading lines:", error);
        }
      }
    })();
  }, [isAuthenticated, setLines]);

  const handleChangeTransportMode = (transportMode: string) => {
    setSelectedStop(null);
    setSelectedLine(null);
    setSelectedTransportMode(transportMode);
  };

  return lines?.lines ? (
    <Box 
      sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 1.5, 
        mb: 3, 
        width: "100%", 
        justifyContent: "center" 
      }}
    >
      {Object.keys(lines.lines).map((key: string) => (
        <Chip
          key={key}
          label={`${key} (${(lines?.count && lines.count[key]) || 0})`}
          onClick={() => handleChangeTransportMode(key)}
          variant={key === selectedTransportMode ? "filled" : "outlined"}
          color={key === selectedTransportMode ? "primary" : "default"}
          sx={{
            px: 1,
            fontWeight: 600,
            transition: "all 0.2s",
            "&:hover": { transform: "translateY(-1px)" },
            ...(key === selectedTransportMode && {
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
            }),
          }}
        />
      ))}
    </Box>
  ) : null;
};

export default TransportModesList;
