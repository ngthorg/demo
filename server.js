/* eslint no-console:0 */
require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const render = require('./src/server');

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(compress());
app.use(express.static(`${__dirname}/public`, { maxage: 8640000 }));

app.get('*', render.default);

app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  const status = err.status || 500;
  res.status(status);
  if (err.status) {
    res.send(err.message);
  } else {
    res.send('Internal server error');
  }
});

app.listen(port, () => {
  console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
