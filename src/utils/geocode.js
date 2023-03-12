const request = require("request");

const geocode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmFoYW5pIiwiYSI6ImNsZXduYXp4NTEwM2Izdm1raXUxcXdia3QifQ.V10LIEB7nd_GxbyuQuxbEA";

  request({ url: geoUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to internet.", undefined);
    } else if (body.features.length === 0) {
      callback(" unable to find location, try later.", undefined);
    } else {
      callback(undefined, {
        latitude: JSON.stringify(body.features[0].center[1]),
        longitude: JSON.stringify(body.features[0].center[0]),
        location: JSON.stringify(body.features[0].place_name),
      });
    }
  });
};

module.exports = geocode;
