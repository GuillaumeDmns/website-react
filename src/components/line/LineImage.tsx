import React from "react";
import { IDFMLine } from "api/api.types";
import { styled } from "@mui/material";
import { getLineBackgroundColor, getLineBorder, getLineBorderRadius, getLineColor } from "utils/line.utils";

const NavText = styled("div", {
  shouldForwardProp: (prop) => prop !== "line",
})<{ line: IDFMLine }>(({ line }) => ({
  backgroundColor: getLineBackgroundColor(line),
  color: getLineColor(line),
  minWidth: "20px",
  textAlign: "center",
  borderRadius: getLineBorderRadius(line),
  borderTop: getLineBorder(line),
  borderBottom: getLineBorder(line),
  fontWeight: "bold",
  padding: "5px",
  margin: "5px",
}));

type Props = {
  line: IDFMLine;
};

const LineImage: React.FC<Props> = ({ line }: Props) => <NavText line={line}>{line.name}</NavText>;

export default LineImage;
