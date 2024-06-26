import React from "react";
import { LineDTO } from "api/api.types";
import { styled } from "@mui/material";
import { getLineBackgroundColor, getLineBorder, getLineBorderRadius, getLineColor, getLinePadding } from "utils/line.utils";

const NavText = styled("div", {
  shouldForwardProp: (prop) => prop !== "line" && prop !== "isUnselected",
})<{ line: LineDTO; isUnselected: boolean }>(({ line, isUnselected }) => ({
  backgroundColor: getLineBackgroundColor(line),
  color: getLineColor(line),
  minWidth: "40px",
  minHeight: "40px",
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
  opacity: isUnselected ? "50%" : "100%",
}));

type Props = {
  line: LineDTO;
  isUnselected: boolean;
};

const LineImage: React.FC<Props> = ({ line, isUnselected }: Props) => (
  <NavText line={line} isUnselected={isUnselected}>
    {line.name}
  </NavText>
);

export default LineImage;
