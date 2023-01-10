import React from "react";
import { IDFMLine } from "api/api.types";
import { styled } from "@mui/material";
import { getLineBackgroundColor, getLineBorder, getLineBorderRadius, getLineColor, getLinePadding } from "utils/line.utils";

const NavText = styled("div", {
  shouldForwardProp: (prop) => prop !== "line",
})<{ line: IDFMLine }>(({ line }) => ({
  backgroundColor: getLineBackgroundColor(line),
  color: getLineColor(line),
  minWidth: "30px",
  minHeight: "30px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: getLineBorderRadius(line),
  borderTop: getLineBorder(line),
  borderBottom: getLineBorder(line),
  fontWeight: "bold",
  padding: getLinePadding(line),
  margin: "10px",
  cursor: "pointer",
}));

type Props = {
  line: IDFMLine;
};

const LineImage: React.FC<Props> = ({ line }: Props) => <NavText line={line}>{line.name}</NavText>;

export default LineImage;
