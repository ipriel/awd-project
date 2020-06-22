const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const ws = require('./ws');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.register(app);
ws.init(app);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connection to MongoDB successful')
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));