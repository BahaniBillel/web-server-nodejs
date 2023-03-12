const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.send("home page");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: " You must provide an address!" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log(error);
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("please provide a valid search word");
  }
});

app.get("*", (req, res) => {
  res.send("the page you looking for does not exist");
});
app.listen(3000, () => {
  console.log("the server is runing");
});
