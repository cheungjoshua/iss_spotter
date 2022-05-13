const request = require("request-promise-native");
const API_KEY = "0MddPlPQWbjK1KYwfPwvrSsCz9nxC0YwH9i7iLaq";

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/json/${ip}?apikey=${API_KEY}`);
};

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body);
  const LAT = latitude;
  const LON = longitude;
  return request(`https://iss-pass.herokuapp.com/json/?lat=${LAT}&lon=${LON}`);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
