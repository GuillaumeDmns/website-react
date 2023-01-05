const endpoints = {
  authentication: {
    signIn: `signin`,
    refresh: `refresh`,
  },
  idfm: {
    getLines: `lines`,
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
