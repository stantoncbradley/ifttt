const stringHash = require('string-hash');

const experiments = {
  buttonColor: [
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
};

const getBucket = (session, experimentName, db) => {
  const hash = stringHash(`${session}${experimentName}`) % 100;
  debugger;
  const experiment = db.collection('experiments').find({ name: experimentName });
  //   const experiment = experiments[experimentName];
  let placeholder = 0;
  const bucketsWithRange = experiment.map((bucket) => {
    const bucketWithRange = {
      name: bucket.name,
      startIndex: placeholder,
      endIndex: placeholder + bucket.size - 1, // start at zero, go to size - 1
    };
    placeholder += bucket.size;
    return bucketWithRange;
  });
  return bucketsWithRange.find(
    b => b.startIndex <= hash && b.endIndex >= hash,
  ).name;
};

module.exports = getBucket;
