const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kevin:kevin@ugoportfolio.fbagqep.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
}

module.exports = { connect, client };
