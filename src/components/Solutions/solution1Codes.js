

export const nodejsSolution =
`'use strict';
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('world');
});

app.get('/hello-json', (req, res) => {
  res.json({
    hello: 'world'
  });
});

app.listen(process.env.PORT, function () {
  console.log('Listening on', process.env.PORT);
  //Keep this line, otherwise your app will fail testing
  console.log('READY');
});`;
