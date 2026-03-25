import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

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
      { name: "Github", link: "https://github.com/GuillaumeDmns" },
      { name: "Linkedin", link: "https://www.linkedin.com/in/guillaumedamiens/" },
    ],
  },
];

const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      mt: "auto",
      py: 6,
      px: 2,
      backgroundColor: "rgba(30, 41, 59, 0.3)",
      borderTop: "1px solid rgba(148, 163, 184, 0.1)",
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="space-between">
        {footers.map((footer) => (
          <Grid item xs={12} sm={4} key={footer.title}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700 }}>
              {footer.title}
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              {footer.description.map((item) => (
                <Box component="li" key={item.name} sx={{ py: 0.5 }}>
                  <Link 
                    href={item.link} 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      transition: "color 0.2s",
                      "&:hover": { color: "primary.main" }
                    }}
                  >
                    {item.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700 }}>
            Contact
          </Typography>
          <Typography variant="body2" color="text.secondary">
            N'hésitez pas à me contacter sur mes réseaux sociaux pour toute collaboration.
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Copyright />
      </Box>
    </Container>
  </Box>
);

export default Footer;
