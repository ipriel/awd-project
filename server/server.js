const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const proxy = require("express-http-proxy");

const routes = require("./routes");
const ws = require("./ws");
const scraper = require("./scraper");

const port = process.env.PORT || 3000;

scraper.initScheduler();

/**
 * proxy request to local client to conform to cors
 * requiremnts on local development 
 */
if (process.env.NODE_ENV !== "prod") {
  app.use(
    "/",
    proxy("http://localhost:4200", {
      filter: (req, res) => {
        return !req.url.startsWith("/api");
      },
    })
  );
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.register(app, __dirname);

const server = app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
ws.init(server);

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection to MongoDB successful");
});

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
