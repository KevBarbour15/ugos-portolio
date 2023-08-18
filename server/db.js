const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://kevin:kevin@ugoportfolio.fbagqep.mongodb.net/portfolio?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect();

    const databasesList = await client.db().admin().listDatabases();

    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB through Mongoose"))
      .catch((err) =>
        console.error("Could not connect to MongoDB through Mongoose", err)
      );
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
}

module.exports = { connect, client };
