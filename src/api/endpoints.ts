const endpoints = {
  authentication: {
    signIn: `signin`,
    refresh: `refresh`,
  },
  idfm: {
    getLines: `lines`,
    getStopsByLine: `stops-by-line`,
    getStopNextPassage: `get-stop-next-passages`,
  },
  ratp: {
    getReseaux: `reseaux`,
    getLinesByReseauId: `lines`,
    getStationsByLineId: `stations`,
    getNextMissionsByLineAndStation: `next`,
    getFullMissionByLine: `full-mission`,
  },
};

export default endpoints;
