import React from "react";
import ReactPlayer from "react-player";
import { Grid } from "@material-ui/core";

import Body from "components/body";
import MediaContainer from "components/layout";

const Videos: React.FC = () => {
  return (
    <Body>
      <Grid container justify="space-evenly" alignContent="space-around">
        <MediaContainer>
          <ReactPlayer url="https://youtu.be/4zPo35VufX0" controls />
        </MediaContainer>
        <MediaContainer>
          <ReactPlayer url="https://youtu.be/m9bQpUPdIl8" controls />
        </MediaContainer>
        <MediaContainer>
          <iframe
            title="Aftermovie Intégration UTC 2017"
            src="https://player.vimeo.com/video/255537990"
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </MediaContainer>
      </Grid>
    </Body>
  );
};

export default Videos;
