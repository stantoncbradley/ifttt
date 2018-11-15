const express = require('express');
const session = require('express-session');
const guid = require('./guid');
const getBucket = require('./getBucket');
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb://localhost:27017/experiments', (err, client) => {
//   if (err) throw err;

  db = client.db('experiments');

//   db.collection('experiments').insertMany([
//     {
//       name: 'buttonColor',
//       data: [
//         {
//           name: 'control',
//           size: 50,
//         },
//         {
//           name: 'red',
//           size: 25,
//         },
//         {
//           name: 'blue',
//           size: 25,
//         },
//       ],
//     },
//   ]);
});


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
  const bucket = getBucket(session, experimentName, db);
  //   debugger;
  res.send(`bucket is ${bucket} for experiment ${experimentName} and session ${session}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
