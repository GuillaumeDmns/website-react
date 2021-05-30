export interface Credentials {
  password?: string;
  username?: string;
}

export interface Direction {
  line?: Line;
  name?: string;
  sens?: string;
  stationsEndLine?: Station[];
}

export interface GeoPoint {
  id?: string;
  name?: string;
  nameSuffix?: string;
  type?: string;

  /** @format double */
  x?: number;

  /** @format double */
  y?: number;
}

export interface JwtDTO {
  jwt?: string;
}

export interface Line {
  code?: string;
  codeStif?: string;
  id?: string;
  image?: string;
  name?: string;
  realm?: string;
  reseau?: Reseau;
}

export interface LineCustom {
  code?: string;
  codeStif?: string;
  id?: string;
  image?: string;
  name?: string;
  realm?: string;
  reseau?: ReseauCustom;
}

export interface LinesDTO {
  /** @format date-time */
  currentDate?: string;
  lines?: RATPLine[];
}

export interface MissionCustom {
  code?: string;
  direction?: string;
  id?: string;
  messages?: string;
  nextPassage?: string;
  platform?: string;
  stationStop?: boolean;
}

export interface NextMissionsDTO {
  ambiguityMessage?: string;

  /** @format date-time */
  currentDate?: string;
  nextMissions?: MissionCustom[];
  requestedDate?: string;
}

export interface RATPLine {
  code?: string;
  codeStif?: string;
  id?: string;
  image?: string;
  name?: string;
  realm?: string;
  reseauId?: string;
}

export interface RATPReseau {
  code?: string;
  id?: string;
  image?: string;
  name?: string;
}

export interface Reseau {
  code?: string;
  id?: string;
  image?: string;
  name?: string;
}

export interface ReseauCustom {
  code?: string;
  id?: string;
  image?: string;
  name?: string;
}

export interface ReseauxDTO {
  /** @format date-time */
  currentDate?: string;
  reseaux?: RATPReseau[];
}

export interface Station {
  direction?: Direction;
  geoPointA?: GeoPoint;
  geoPointR?: GeoPoint;
  id?: string;
  idsNextA?: string[];
  idsNextR?: string[];
  line?: Line;
  name?: string;
  stationArea?: StationArea;
}

export interface StationAcces {
  address?: string;
  id?: string;
  index?: string;
  name?: string;
  timeDaysLabel?: string;
  timeDaysStatus?: string;
  timeEnd?: string;
  timeStart?: string;

  /** @format double */
  x?: number;

  /** @format double */
  y?: number;
}

export interface StationArea {
  access?: StationAcces[];
  id?: string;
  name?: string;
  stations?: Station[];
  tarifsToParis?: Tarif[];
  zoneCarteOrange?: string;
}

export interface StationCustom {
  direction?: Direction;
  geoPointA?: GeoPoint;
  geoPointR?: GeoPoint;
  id?: string;
  line?: LineCustom;
  name?: string;
  nextA?: string[];
  nextR?: string[];
  stationArea?: StationArea;
}

export interface StationsDTO {
  /** @format date-time */
  currentDate?: string;
  stations?: StationCustom[];
}

export interface Tarif {
  /** @format float */
  demiTarif?: number;

  /** @format float */
  pleinTarif?: number;
  viaLine?: Line;
  viaReseau?: Reseau;
}
