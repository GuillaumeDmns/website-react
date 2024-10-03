import * as React from "react";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import { CallUnit, IDFMStopArea, UnitIDFMDTO } from "api/api.types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.extend(relativeTime);
dayjs.locale("fr");

type Props = {
  selectedTransportMode: string | null;
  selectedLine: string | null;
  selectedStop: IDFMStopArea | null;
  unitIDFM: UnitIDFMDTO | null;
  loadingNextPassages: boolean;
};

const Timetable: React.FC<Props> = ({ selectedTransportMode, selectedLine, selectedStop, unitIDFM, loadingNextPassages }: Props) => {
  return selectedTransportMode && selectedLine && selectedStop && unitIDFM && unitIDFM.nextPassages && unitIDFM.nextPassageDestinations ? (
    <Box sx={{ width: "100%", mt: 2 }}>
      {unitIDFM.nextPassages && unitIDFM.nextPassageDestinations && unitIDFM.nextPassages.length > 0 && unitIDFM.nextPassageDestinations.length > 0 ? (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {unitIDFM.nextPassageDestinations.map((direction) => {
            const nextPassages = unitIDFM.nextPassages || [];
            const departures = nextPassages.filter((p: CallUnit) => p.destinationDisplay === direction);
            return (
              <Grid key={direction} item xs={12} md={6} lg={direction.length > 20 ? 6 : 4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2, 
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(30, 41, 59, 0.4)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                  }}
                >
                  <Typography variant="overline" sx={{ fontWeight: 800, mb: 2, color: "primary.light", textAlign: "center", display: "block", fontSize: "0.75rem", letterSpacing: 1.2 }}>
                    Vers {direction}
                  </Typography>
                  
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 1, 
                    maxHeight: "260px", 
                    overflowY: "auto",
                    pr: 0.5,
                    "::-webkit-scrollbar": { width: "4px" },
                    "::-webkit-scrollbar-thumb": { background: "rgba(148, 163, 184, 0.2)", borderRadius: "4px" }
                  }}>
                    {departures.map((passage: CallUnit, index) => {
                      const time = dayjs(passage.expectedDepartureTime ?? passage.aimedDepartureTime ?? passage.expectedArrivalTime);
                      const isNext = index === 0;
                      return (
                        <Box 
                          key={`${passage.destinationDisplay}-${index}-${time.valueOf()}`}
                          sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center",
                            p: 1.5,
                            borderRadius: "12px",
                            backgroundColor: isNext ? "rgba(59, 130, 246, 0.15)" : "rgba(15, 23, 42, 0.3)",
                            border: isNext ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
                            boxShadow: isNext ? "0 0 15px rgba(59, 130, 246, 0.1)" : "none",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: isNext ? "rgba(59, 130, 246, 0.2)" : "rgba(15, 23, 42, 0.5)",
                            }
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: isNext ? "primary.light" : "text.primary", fontSize: "1.1rem" }}>
                              {time.fromNow(true)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.6, fontSize: "0.75rem" }}>
                              • {time.format("HH:mm")}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {passage.vehicleAtStop && (
                              <Chip 
                                label="À L'ARRÊT" 
                                size="small" 
                                color="success" 
                                sx={{ height: 20, fontWeight: 700, fontSize: "0.65rem", borderRadius: "4px" }} 
                              />
                            )}
                            {isNext && !passage.vehicleAtStop && (
                              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 8px #3b82f6" }} />
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4, opacity: 0.6 }}>
          Pas de prochains départs prévus !
        </Typography>
      )}
    </Box>
  ) : null;
};

export default Timetable;
