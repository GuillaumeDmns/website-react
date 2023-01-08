export interface Credentials {
  password?: string;
  username?: string;
}

export interface FullMissionDTO {
  /** @format date-time */
  currentDate?: string;
  links?: ConnexionCount[];
  stationsDTO?: StationsDTO;
}

export interface JwtDTO {
  jwt?: string;
}

// export interface LinesDTO {
//   /** @format date-time */
//   currentDate?: string;
//   lines?: RATPLine[];
// }

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

export interface ConnexionCount {
  left?: string;
  middle?: string;
  right?: number;
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

export interface LinesDTO {
  lines?: Record<string, IDFMLine[]>;
  count?: Record<string, number>;
}

export interface StopsByLineDTO {
  stops?: IDFMStopArea[];
}

export interface IDFMLine {
  id?: string;
  name?: string;
  transportMode?: "BUS" | "NOCTILIEN" | "METRO" | "TRAM" | "TER" | "TRANSILIEN" | "RER";
  /** @format int32 */
  operatorId?: number;
  lineIdColor?: string;
  lineIdBackgroundColor?: string;
}

export interface IDFMStopArea {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  type?: string;
}
