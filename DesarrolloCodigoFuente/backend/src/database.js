const mongoose = require("mongoose");


const URI = process.env.MONGODB_URI;


mongoose.connect(URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});
