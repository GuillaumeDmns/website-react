import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

import Copyright from "./Copyright";

const footers = [
  {
    title: "Accès Rapide",
    description: [
      { name: "Home", link: "/" },
      { name: "Photos", link: "/photos" },
      { name: "Vidéos", link: "/videos" },
    ],
  },
  {
    title: "Réseaux",
    description: [
      { name: "Github", link: "https://github.com" },
      { name: "Linkedin", link: "https://www.linkedin.com/in/guillaumedamiens/" },
    ],
  },
];

const Footer: React.FC = () => (
  <Container
    maxWidth="md"
    component="footer"
    sx={{
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      mt: 8,
      py: [3, 6],
    }}
  >
    <Grid container spacing={4} justifyContent="space-evenly">
      {footers.map((footer) => (
        <Grid item xs={6} sm={3} key={footer.title}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            {footer.title}
          </Typography>
          <ul>
            {footer.description.map((item) => (
              <li key={item.name}>
                <Link href={item.link} variant="subtitle1" color="text.secondary">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
      ))}
    </Grid>
    <Copyright />
  </Container>
);

export default Footer;
