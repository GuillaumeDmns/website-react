import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Box, Button, Grid, Paper, Typography, Chip } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import Body from "components/body";
import { IRootState } from "store/types";
import { IDFMStopArea, LineDTO, LinesDTO, StopsByLineDTO, UnitIDFMDTO } from "api/api.types";
import LoginDialog from "components/dialog";
import OpenStreetMapContainer from "components/openstreetmap/OpenStreetMapContainer";
import TransportModesList from "components/idfm/TransportModesList";
import LinesList from "components/idfm/LinesList";
import StopsList from "components/idfm/StopsList";
import Timetable from "components/idfm/Timetable";
import api from "../../api/api.ts";
import useFetch from "../../hooks/useFetch.ts";

dayjs.extend(relativeTime);
dayjs.locale("fr");

// Helper component for Step Titles
const StepHeader: React.FC<{ step: number; title: string; active?: boolean }> = ({ step, title, active }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
    <Chip 
      label={step} 
      size="small" 
      color={active ? "primary" : "default"} 
      sx={{ 
        height: 24, 
        width: 24, 
        minWidth: 24, 
        p: 0, 
        fontWeight: 700,
        "& .MuiChip-label": { px: 0 }
      }} 
    />
    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1, opacity: active ? 1 : 0.6 }}>
      {title}
    </Typography>
  </Box>
);

const Home: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [linesDTO, setLinesDTO] = useState<LinesDTO | null>(null);
  const [stopsDTO, setStopsDTO] = useState<StopsByLineDTO | null>(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState<string | null>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<IDFMStopArea | null>(null);
  const [unitIDFMDTO, setUnitIDFMDTO] = useState<UnitIDFMDTO | null>(null);

  const isAuthenticated: boolean = useSelector((state: IRootState) => state.authentication.isAuthenticated);
  const selectedLine: LineDTO | undefined =
    (selectedTransportMode &&
      linesDTO &&
      linesDTO.lines &&
      linesDTO.lines[selectedTransportMode].find((line) => line.id === selectedLineId)) ||
    undefined;

  const [loadingNextPassages, getNextPassages] = useFetch((stopId: number, lineId: string) => api.idfm.getStopNextPassage(stopId, lineId));

  const handleClickOpenLoginDialog = () => setLoginDialogOpen(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const mainAreaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
  };

  return (
    <Body>
      {isAuthenticated ? (
        <Grid 
          container 
          spacing={3}
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Sidebar / Selection Area */}
          <Grid item xs={12} lg={4}>
            <motion.div variants={itemVariants}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  borderRadius: "20px",
                  background: "rgba(30, 41, 59, 0.4)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(148, 163, 184, 0.1)",
                  position: { lg: "sticky" },
                  top: { lg: "100px" },
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, mb: 3, color: "primary.light" }}>
                  Configuration du Trajet
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Step 1: Mode */}
                  <Box>
                    <StepHeader step={1} title="Mode de Transport" active />
                    <TransportModesList
                      lines={linesDTO}
                      selectedTransportMode={selectedTransportMode}
                      setLines={setLinesDTO}
                      setSelectedTransportMode={setSelectedTransportMode}
                      setSelectedLine={setSelectedLineId}
                      setSelectedStop={setSelectedStop}
                    />
                  </Box>

                  <AnimatePresence>
                    {/* Step 2: Line */}
                    {selectedTransportMode && (
                      <Box 
                        component={motion.div} 
                        key="step2"
                        variants={stepVariants} 
                        initial="hidden" 
                        animate="visible" 
                        exit="exit"
                      >
                        <StepHeader step={2} title="Lignes" active />
                        <LinesList
                          lines={linesDTO}
                          selectedTransportMode={selectedTransportMode}
                          selectedLine={selectedLineId}
                          setStops={setStopsDTO}
                          setSelectedLine={setSelectedLineId}
                          setSelectedStop={setSelectedStop}
                        />
                      </Box>
                    )}

                    {/* Step 3: Stop */}
                    {selectedLineId && (
                      <Box 
                        component={motion.div} 
                        key="step3"
                        variants={stepVariants} 
                        initial="hidden" 
                        animate="visible" 
                        exit="exit"
                      >
                        <StepHeader step={3} title="Arrêt" active />
                        <StopsList
                          stops={stopsDTO}
                          selectedStop={selectedStop}
                          selectedLine={selectedLineId}
                          selectedTransportMode={selectedTransportMode}
                          setSelectedStop={setSelectedStop}
                          setUnitIDFM={setUnitIDFMDTO}
                        />
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} lg={8}>
            <Box 
              component={motion.div}
              variants={mainAreaVariants}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <AnimatePresence>
                {/* Map Section - Always visible if authenticated */}
                <Box 
                  key="map-section"
                  component={motion.div}
                  layout
                >
                  <Paper 
                    elevation={0}
                    sx={{ 
                      borderRadius: "20px", 
                      overflow: "hidden",
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                      height: "400px"
                    }}
                  >
                    <OpenStreetMapContainer
                      stopsByLine={stopsDTO}
                      selectedStop={selectedStop}
                      selectedLine={selectedLine}
                      setSelectedStop={setSelectedStop}
                    />
                  </Paper>
                </Box>

                {/* Timetable Section - Visible when stop is selected */}
                {selectedStop && (
                  <Box 
                    key="timetable-section"
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Timetable
                      selectedTransportMode={selectedTransportMode}
                      selectedLine={selectedLineId}
                      selectedStop={selectedStop}
                      unitIDFM={unitIDFMDTO}
                    />
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Paper 
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          elevation={0}
          sx={{ 
            p: 6, 
            textAlign: "center", 
            borderRadius: "24px",
            background: "rgba(30, 41, 59, 0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(148, 163, 184, 0.1)",
            maxWidth: "500px",
            mx: "auto",
            mt: 4
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Bienvenue
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Connectez-vous pour accéder à vos informations de transport en temps réel.
          </Typography>
          <Button 
            size="large" 
            variant="contained" 
            color="primary" 
            onClick={handleClickOpenLoginDialog}
            sx={{ px: 4 }}
          >
            Se connecter
          </Button>
        </Paper>
      )}

      <LoginDialog loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen} />
    </Body>
  );
};

export default Home;
