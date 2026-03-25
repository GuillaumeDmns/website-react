import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

import Body from "components/body";
import street from "images/street.jpg";
import lake from "images/lake.jpg";
import train from "images/train.jpg";
import metro from "images/metro.jpg";
import camp from "images/camp.jpg";
import river from "images/krakowriver.jpg";
import building from "images/parisbuilding.jpg";
import malta from "images/malta.jpg";
import vienna from "images/vienne.jpg";

import { motion } from "framer-motion";

const Photos: React.FC = () => {
  const photos = [
    { src: street, alt: "street", title: "Night Street" },
    { src: lake, alt: "lake", title: "Slovak Lake" },
    { src: train, alt: "train", title: "Prague Tracks" },
    { src: metro, alt: "metro", title: "Prague Metro" },
    { src: camp, alt: "camp", title: "Auschwitz" },
    { src: river, alt: "river", title: "Krakow River" },
    { src: vienna, alt: "vienna", title: "Vienna" },
    { src: building, alt: "building", title: "Paris Building" },
    { src: malta, alt: "malta", title: "Malta" },
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
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
          Ma Galerie Photos
        </Typography>
        <Grid container spacing={3}>
          {photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    aspectRatio: "16/10",
                    "&:hover .overlay": { opacity: 1 },
                    "&:hover img": { transform: "scale(1.1)" },
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease-in-out",
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(15, 23, 42, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease-in-out",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                      {photo.title}
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

export default Photos;
