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
import malta from "images/malta.jpg";
import vienna from "images/vienne.jpg";

const Photos: React.FC = () => {
  return (
    <Body>
      <Grid container justify="space-evenly" alignContent="space-around" spacing={2}>
        <img src={street} alt="street" width="439" height="250" />
        <img src={lake} alt="lake" width="388" height="250" />
        <img src={train} alt="train" width="375" height="250" />
        <img src={metro} alt="metro" width="375" height="250" />
        <img src={camp} alt="camp" width="375" height="250" />
        <img src={river} alt="river" width="375" height="250" />
        <img src={vienna} alt="vienna" width="375" height="250" />
        <img src={building} alt="building" width="167" height="250" />
        <img src={malta} alt="malta" width="141" height="250" />
      </Grid>
    </Body>
  );
};

export default Photos;
