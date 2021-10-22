const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });
    console.log("DB ONLINE")
  } catch (error) {
    console.log(error)
    throw new Error("Error al iniciar DB")
  }
};

module.exports = {dbConnection}
