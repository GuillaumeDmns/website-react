import React from "react";
import ReactPlayerModule from "react-player";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = (ReactPlayerModule as any).default || ReactPlayerModule;
import { Box, Grid, Paper, Typography } from "@mui/material";

import Body from "components/body";

import { motion } from "framer-motion";

const Videos: React.FC = () => {
  const videos = [
    { url: "https://youtu.be/4zPo35VufX0", title: "Aftermovie Imaginarium Festival 2019" },
    { url: "https://youtu.be/m9bQpUPdIl8", title: "Aftermovie Gala ESCOM 2018" },
    { url: "https://player.vimeo.com/video/255537990", title: "Aftermovie Intégration UTC 2017", isVimeo: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Body>
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{ width: "100%" }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 4, textAlign: "center" }}>
          Vidéos
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {videos.map((video, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "rgba(30, 41, 59, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", pt: "56.25%", backgroundColor: "black" }}>
                    {video.isVimeo ? (
                      <iframe
                        title={video.title}
                        src={video.url}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <ReactPlayer
                        src={video.url}
                        controls
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                      />
                    )}
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {video.title}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Body>
  );
};

export default Videos;
