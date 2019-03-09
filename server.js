const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const hdbRoutes = express.Router();
const hdbscrape = require('./scrapers/hdbscrape');
const PORT = process.env.PORT 4000;
const scrapeSites = require('./scrapesites.js');
const path = require('path');

let Hdb = require("./hdb.model");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect("mongodb://127.0.0.1:27017/hdb", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

scrapeSites.scrapeSites.forEach(site => {
  hdbscrape.scrape(site.url, site.projectname).then(allUnits => {
    let hdb = new Hdb({
      project: Object.keys(allUnits),
      units: allUnits[`${Object.keys(allUnits)}`]
    });
    hdb.save();
  });

  let town = site.projectname.split(" ")

  hdbRoutes.route(`/${town[0]}/${town[1][0]}`).get(function(req, res) {
    Hdb.find({ project: site.projectname }, function(err, hdbs) {
      if (err) {
        console.log(err);
      } else {
        res.json(hdbs);
      };
    });
  });
});

app.use('/hdb', hdbRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});