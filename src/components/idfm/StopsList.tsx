import * as React from "react";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
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
    <Grid container justifyContent="center" alignItems="center">
      <Autocomplete
        value={selectedStop}
        onChange={(event: React.SyntheticEvent, newSelectedStop: IDFMStopArea | null) => {
          setSelectedStop(newSelectedStop);
        }}
        style={{ width: 300 }}
        size="small"
        options={stops?.stops || ([] as Array<IDFMStopArea>)}
        autoHighlight
        getOptionLabel={(stop: IDFMStopArea) => stop.name || ""}
        renderInput={(params) => <TextField {...params} label="Choisissez un arrêt" variant="outlined" />}
      />
      <IconButton color="primary" aria-label="refresh" component="label" disabled={isSelectedLineLoading} onClick={loadNextPassages}>
        <Refresh />
      </IconButton>
    </Grid>
  ) : null;
};

export default StopsList;
