const request = require("request");
const API_KEY = "0MddPlPQWbjK1KYwfPwvrSsCz9nxC0YwH9i7iLaq";

const fetchMyIP = function (callback) {
  request(
    "https://api.ipify.org?format=json",
    function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `1,Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  );
};

const fetchCoordsByIP = function (ip, callback) {
  request(
    `https://api.ipbase.com/json/${ip}?apikey=${API_KEY}`,
    function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `2,Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      // let geo = {};
      // const data = JSON.parse(body);
      // geo.latitude = data.latitude;
      // geo.longitude = data.longitude;
      // geo = JSON.stringify(geo);
      const { latitude, longitude } = JSON.parse(body);

      callback(null, { latitude, longitude });
    }
  );
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const LAT = coords.latitude;
  const LON = coords.longitude;
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${LAT}&lon=${LON}`,
    function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `3,Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body).response;
      callback(null, data);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, data) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(data, (error, result) => {
        if (error) return callback(error, null);
        callback(error, result);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};

//  {latitude: 49.28165817260742, longitude: -123.12532806396484}
