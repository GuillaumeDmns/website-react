import { IDFMLine } from "api/api.types";

export const getLineBackgroundColor = (line: IDFMLine) => {
  switch (line.transportMode) {
    case "TRAM":
      return "white";
    case "BUS":
    case "NOCTILIEN":
    case "RER":
    case "METRO":
    case "TER":
    default:
      return `#${line.lineIdBackgroundColor}`;
  }
};

export const getLineColor = (line: IDFMLine) => {
  switch (line.transportMode) {
    case "TRAM":
      return "black";
    case "BUS":
    case "NOCTILIEN":
    case "RER":
    case "METRO":
    case "TER":
    default:
      return `#${line.lineIdColor}`;
  }
};

export const getLineBorderRadius = (line: IDFMLine) => {
  switch (line.transportMode) {
    case "METRO":
      return "100%";
    case "TRAM":
    case "BUS":
    case "NOCTILIEN":
    case "RER":
    case "TER":
    default:
      return `0px`;
  }
};

export const getLineBorder = (line: IDFMLine) => {
  switch (line.transportMode) {
    case "TRAM":
      return `5px solid #${line.lineIdBackgroundColor}`;
    case "METRO":
    case "BUS":
    case "NOCTILIEN":
    case "RER":
    case "TER":
    default:
      return `0px`;
  }
};
