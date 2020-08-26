import React from "react";
import { Grid } from "@material-ui/core";

import Body from "components/body";
import street from "images/street.jpg";
import lake from "images/lake.jpg";
import train from "images/train.jpg";
import metro from "images/metro.jpg";
import camp from "images/camp.jpg";
import river from "images/krakowriver.jpg";
import building from "images/parisbuilding.jpg";
import malte from "images/malte.jpg";
import vienna from "images/vienne.jpg";

const Photos: React.FC = () => {
  return (
    <Body>
      <Grid container justify="space-evenly">
        <img src={street} alt="street" width="439" height="250" />
        <img src={lake} alt="street" width="388" height="250" />
        <img src={train} alt="street" width="375" height="250" />
        <img src={metro} alt="street" width="375" height="250" />
        <img src={camp} alt="street" width="375" height="250" />
        <img src={river} alt="street" width="375" height="250" />
        <img src={vienna} alt="street" width="375" height="250" />
        <img src={building} alt="street" width="167" height="250" />
        <img src={malte} alt="street" width="141" height="250" />
      </Grid>
    </Body>
  );
};

export default Photos;
