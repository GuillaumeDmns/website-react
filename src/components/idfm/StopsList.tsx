import * as React from "react";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { IDFMStopArea, StopsByLineDTO, UnitIDFMDTO } from "api/api.types";
import { Refresh } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import api from "api/api";

type Props = {
  stops: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLine: string | null;
  selectedTransportMode: string | null;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
  setUnitIDFM: React.Dispatch<React.SetStateAction<UnitIDFMDTO | null>>;
};

const StopsList: React.FC<Props> = ({ stops, selectedStop, selectedLine, selectedTransportMode, setSelectedStop, setUnitIDFM }: Props) => {
  const [isSelectedLineLoading, setIsSelectedLineLoading] = useState<boolean>(false);

  const loadNextPassages = useCallback(async () => {
    if (selectedTransportMode && selectedLine && selectedStop && selectedStop.id) {
      setIsSelectedLineLoading(true);
      try {
        const response = await api.idfm.getStopNextPassage(selectedStop.id, selectedLine);
        if (response && response.data && response.data.nextPassages) {
          setUnitIDFM(response.data);
          setIsSelectedLineLoading(false);
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
    }
  }, [selectedTransportMode, selectedLine, selectedStop, setUnitIDFM]);

  useEffect(() => {
    loadNextPassages()
      // eslint-disable-next-line
      .catch(console.error);
  }, [loadNextPassages, selectedTransportMode, selectedLine, selectedStop]);

  return selectedTransportMode && selectedLine ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mb: 4 }}>
      <Autocomplete
        value={selectedStop}
        onChange={(event: React.SyntheticEvent, newSelectedStop: IDFMStopArea | null) => {
          setSelectedStop(newSelectedStop);
        }}
        sx={{ width: 400 }}
        size="medium"
        options={stops?.stops || ([] as Array<IDFMStopArea>)}
        autoHighlight
        getOptionLabel={(stop: IDFMStopArea) => stop.name || ""}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Choisir un arrêt" 
            variant="outlined" 
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                backdropFilter: "blur(4px)",
              }
            }}
          />
        )}
      />
      <IconButton 
        color="primary" 
        disabled={isSelectedLineLoading} 
        onClick={loadNextPassages}
        sx={{ 
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.2)" }
        }}
      >
        <Refresh />
      </IconButton>
    </Box>
  ) : null;
};

export default StopsList;
