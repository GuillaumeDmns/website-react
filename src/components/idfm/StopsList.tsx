import * as React from "react";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import { IDFMStopArea, StopsByLineDTO } from "api/api.types";
import { Refresh } from "@mui/icons-material";

type Props = {
  stops: StopsByLineDTO | null;
  selectedStop: IDFMStopArea | null;
  selectedLine: string | null;
  selectedTransportMode: string | null;
  setSelectedStop: React.Dispatch<React.SetStateAction<IDFMStopArea | null>>;
  loadNextPassages: () => Promise<void>;
};

const StopsList: React.FC<Props> = ({ stops, selectedStop, selectedLine, selectedTransportMode, setSelectedStop, loadNextPassages }: Props) => {

  return selectedTransportMode && selectedLine ? (
    <Grid container justifyContent="center" alignItems="center">
      <Autocomplete
        value={selectedStop}
        onChange={(_event: React.SyntheticEvent, newSelectedStop: IDFMStopArea | null) => {
          setSelectedStop(newSelectedStop);
        }}
        style={{ width: 300 }}
        size="small"
        options={stops?.stops || ([] as Array<IDFMStopArea>)}
        autoHighlight
        getOptionLabel={(stop: IDFMStopArea) => stop.name || ""}
        renderInput={(params) => <TextField {...params} label="Choisissez un arrêt" variant="outlined" />}
      />
      <IconButton color="primary" aria-label="refresh" component="label" /*disabled={isSelectedLineLoading}*/ onClick={loadNextPassages}>
        <Refresh />
      </IconButton>
    </Grid>
  ) : null;
};

export default StopsList;
