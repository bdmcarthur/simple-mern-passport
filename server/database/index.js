//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//your local database url
//27017 is the default mongoDB port
const uri = "mongodb://localhost:27017/simple-mern-passport";
const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, mongooseConnectionOptions).then(
  () => {
    console.log("Connected to Mongo");
  },
  err => {
    /** handle initial connection error */

    console.log("error connecting to Mongo: ");
    console.log(err);
  }
);

module.exports = mongoose.connection;
