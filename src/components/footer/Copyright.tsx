import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {"Copyright © "}
      <Link color="inherit" href="https://guillaumedamiens.com/">
        Guillaume Damiens
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Copyright;
