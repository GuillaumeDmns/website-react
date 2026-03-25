import * as React from "react";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { IDFMStopArea, StopsByLineDTO } from "api/api.types";
import { Refresh } from "@mui/icons-material";

type Props = {
  stops: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLine: string | null;
  selectedTransportMode: string | null;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
  loadNextPassages: () => Promise<void>;
  isLoading: boolean;
};

const StopsList: React.FC<Props> = ({ stops, selectedStop, selectedLine, selectedTransportMode, setSelectedStop, loadNextPassages, isLoading }: Props) => {

  return selectedTransportMode && selectedLine ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mb: 4 }}>
      <Autocomplete
        value={selectedStop}
        onChange={(_event: React.SyntheticEvent, newSelectedStop: IDFMStopArea | null) => {
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
        disabled={isLoading} 
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
