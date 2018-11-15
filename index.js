const express = require('express');
const session = require('express-session');
const guid = require('./guid');
const getBucket = require('./getBucket');

const app = express();
const port = 3000;

app.use(session({
  genid(req) {
    return guid(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
}));

app.get('/', (req, res) => {
  res.send(`Hello World! session id is ${req.session.id}`);
});

app.get('/experiments/:name', (req, res) => {
  const experimentName = req.params.name;
  const session = req.session.id;
  const bucket = getBucket(session, experimentName);
  //   debugger;
  res.send(`bucket is ${bucket} for experiment ${experimentName} and session ${session}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
