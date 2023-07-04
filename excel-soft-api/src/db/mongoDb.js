const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

const client = new MongoClient(uri);

const database = client.db('exceltest');

const jobs = database.collection('jobs');

const applications = database.collection('applications');

module.exports = {
    database,
    jobs,
    applications
}


async function run() {
  try {
    
    const query = {  };
    const movie = await jobs.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);

