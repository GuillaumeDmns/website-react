import * as React from "react";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";

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
        } catch (e) {
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
    <ButtonGroup size="large" aria-label="large button group">
      {Object.keys(lines.lines).map((key: string) => (
        <Button key={key} variant={key === selectedTransportMode ? "outlined" : "contained"} color="inherit" onClick={() => handleChangeTransportMode(key)}>
          {key} ({(lines?.count && lines.count[key]) || 0})
        </Button>
      ))}
    </ButtonGroup>
  ) : null;
};

export default TransportModesList;
