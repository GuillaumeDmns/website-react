const endpoints = {
  authentication: {
    signIn: `signin`,
    refresh: `refresh`,
  },
  ratp: {
    getReseaux: `reseaux`,
    getLinesByReseauId: `lines`,
    getStationsByLineId: `stations`,
    getNextMissionsByLineAndStation: `next`,
  },
};

export default endpoints;
