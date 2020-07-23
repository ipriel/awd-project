const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const ws = require('./ws');
const scraper = require('./scraper');
const { Product } = require('./models/product.model');

const port = process.env.PORT || 3000;

scraper.initScheduler();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.register(app, __dirname);

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
ws.init(server);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connection to MongoDB successful')
});