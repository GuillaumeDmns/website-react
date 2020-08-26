import React from "react";
import ReactPlayer from "react-player";
import { Grid } from "@material-ui/core";

import Body from "components/body";

const Videos: React.FC = () => {
  return (
    <Body>
      <Grid container justify="space-evenly" alignContent="space-around">
        <ReactPlayer url="https://youtu.be/4zPo35VufX0" controls />
        <ReactPlayer url="https://youtu.be/m9bQpUPdIl8" controls />
        <iframe
          title="Aftermovie Intégration UTC 2017"
          src="https://player.vimeo.com/video/255537990"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </Grid>
    </Body>
  );
};

export default Videos;
