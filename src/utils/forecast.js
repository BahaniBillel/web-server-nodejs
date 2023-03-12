const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const geoUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

  request({ url: geoUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to internet.", "undefined");
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, "it's :" + body.elevation + " right now in miami");
    }
  });
};

module.exports = forecast;
