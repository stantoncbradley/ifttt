const stringHash = require('string-hash');

const getBucket = async (session, experimentName, db) => {
  const hash = stringHash(`${session}${experimentName}`) % 100;
  const experiment = await db.collection('experiments').findOne({ name: experimentName });
  let placeholder = 0;
  const bucketsWithRange = experiment.data.map((bucket) => {
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
