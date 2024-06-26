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
  lines?: Record<string, LineDTO[]>;
  count?: Record<string, number>;
}

export interface StopsByLineDTO {
  stops?: IDFMStopArea[];
  shape?: string;
}

export interface LineDTO {
  id?: string;
  name?: string;
  transportMode?: "BUS" | "NOCTILIEN" | "METRO" | "TRAM" | "TER" | "TRANSILIEN" | "RER";
  /** @format int32 */
  operatorId?: number;
  lineIdColor?: string;
  lineIdBackgroundColor?: string;
}

export interface IDFMStop {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  type?: string;
  /** @format int32 */
  stopAreaId?: number;
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

export interface UnitIDFMDTO {
  stop?: IDFMStop;
  stopArea?: IDFMStopArea;
  nextPassages?: CallUnit[];
  nextPassageDestinations?: Array<string>;
}

export interface CallUnit {
  expectedDepartureTime?: string;
  expectedArrivalTime?: string;
  aimedDepartureTime?: string;
  aimedArrivalTime?: string;
  departureStatus?: string;
  destinationDisplay?: string;
  arrivalPlatformName?: string;
  arrivalStatus?: string;
  vehicleAtStop?: boolean;
  lineId?: string;
  operatorId?: string;
  directionName?: string;
  destinationName?: string;
}
