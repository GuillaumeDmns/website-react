export interface Credentials {
  password?: string;
  username?: string;
}

export interface FullMissionDTO {
  /** @format date-time */
  currentDate?: string;
  links?: PairStringString[];
  stationsDTO?: StationsDTO;
}

export interface JwtDTO {
  jwt?: string;
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
  stationEndLine?: string;
}

export interface NextMissionsDTO {
  ambiguityMessage?: string;

  /** @format date-time */
  currentDate?: string;
  nextMissions?: MissionCustom[];
  requestedDate?: string;
}

export interface PairStringString {
  first?: string;
  second?: string;
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

export interface RATPStation {
  directionName?: string;
  id?: string;
  lineId?: string;
  name?: string;
}

export interface ReseauxDTO {
  /** @format date-time */
  currentDate?: string;
  reseaux?: RATPReseau[];
}

export interface StationsDTO {
  /** @format date-time */
  currentDate?: string;
  stations?: RATPStation[];
}
