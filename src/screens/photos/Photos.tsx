import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import Body from "components/body";
import IMG_6107 from "images/IMG_6107.jpg";
import IMG_6283 from "images/IMG_6283.jpg";
import IMG_6611 from "images/IMG_6611.jpg";
import IMG_6682 from "images/IMG_6682.jpg";
import IMG_7042 from "images/IMG_7042.jpg";
import IMG_7044 from "images/IMG_7044.jpg";
import IMG_7071 from "images/IMG_7071.jpg";
import IMG_7881 from "images/IMG_7881.jpg";
import malte from "images/malte.jpg";
import vienne from "images/vienne.jpg";

const tileData = [
  {
    img: IMG_6107,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_6283,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_6611,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_6682,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_7042,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_7044,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_7071,
    title: "Title",
    author: "Me",
  },
  {
    img: IMG_7881,
    title: "Title",
    author: "Me",
  },
  {
    img: malte,
    title: "Title",
    author: "Me",
  },
  {
    img: vienne,
    title: "Title",
    author: "Me",
  },
];

const Photos: React.FC = () => {
  return (
    <Body>
      <GridList cols={4}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </Body>
  );
};

export default Photos;
