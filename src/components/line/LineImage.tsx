import React from "react";
import { IDFMLine } from "api/api.types";
import { styled } from "@mui/material";

const NavText = styled("div", {
  shouldForwardProp: (prop) => prop !== "line",
})<{ line: IDFMLine }>(({ line }) => ({
  backgroundColor: `#${line.lineIdBackgroundColor}`,
  color: `#${line.lineIdColor}`,
  padding: "5px",
  margin: "5px",
}));

type Props = {
  line: IDFMLine;
};

const LineImage: React.FC<Props> = ({ line }: Props) => <NavText line={line}>{line.name}</NavText>;

export default LineImage;
