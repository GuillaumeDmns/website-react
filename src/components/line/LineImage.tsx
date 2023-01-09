import React from "react";
import { IDFMLine } from "api/api.types";
import { styled } from "@mui/material";

const NavText = styled("div", {
  shouldForwardProp: (prop) => prop !== "line",
})<{ line: IDFMLine }>(({ line }) => ({
  backgroundColor: line.transportMode === "TRAM" ? "white" : `#${line.lineIdBackgroundColor}`,
  color: line.transportMode === "TRAM" ? "black" : `#${line.lineIdColor}`,
  minWidth: "20px",
  textAlign: "center",
  borderRadius: line.transportMode === "METRO" ? "20px" : "0px",
  borderTop: line.transportMode === "TRAM" ? `5px solid #${line.lineIdBackgroundColor}` : "0px",
  borderBottom: line.transportMode === "TRAM" ? `5px solid #${line.lineIdBackgroundColor}` : "0px",
  borderColor: ``,
  fontWeight: "bold",
  padding: "5px",
  margin: "5px",

}));

type Props = {
  line: IDFMLine;
};

const LineImage: React.FC<Props> = ({ line }: Props) => <NavText line={line}>{line.name}</NavText>;

export default LineImage;
