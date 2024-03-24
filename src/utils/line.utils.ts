import { LineDTO } from "api/api.types";

export const getLineBackgroundColor = (line: LineDTO) => {
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

export const getLineColor = (line: LineDTO) => {
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

export const getLineBorderRadius = (line: LineDTO) => {
  switch (line.transportMode) {
    case "METRO":
      return "100%";
    case "RER":
    case "TRANSILIEN":
      return "25%";
    case "BUS":
    case "NOCTILIEN":
    case "TRAM":
    case "TER":
    default:
      return `0px`;
  }
};

export const getLineBorder = (line: LineDTO) => {
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

export const getLinePadding = (line: LineDTO) => {
  switch (line.transportMode) {
    case "BUS":
    case "NOCTILIEN":
      return `0px 5px`;
    case "TRAM":
    case "METRO":
    case "RER":
    case "TER":
    default:
      return `5px`;
  }
};

export const naturalSorter = (line1: LineDTO, line2: LineDTO): number => {
  if (line1.name && line2.name) {
    return line1.name.localeCompare(line2.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }
  return 0;
};
