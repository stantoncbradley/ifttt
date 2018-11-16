const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/experiments', (err, client) => {
//   if (err) throw err;

  const db = client.db('experiments');

  db.collection('experiments').insertMany([
    {
      name: 'buttonColor',
      data: [
        {
          name: 'control',
          size: 50,
        },
        {
          name: 'red',
          size: 25,
        },
        {
          name: 'blue',
          size: 25,
        },
      ],
    },
  ]);
  client.close();
});
