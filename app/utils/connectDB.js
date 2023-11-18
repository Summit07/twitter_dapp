const mongoose = require("mongoose");
// const uri = "mongodb://root:password@127.0.0.1/";
const uri =
  "mongodb+srv://portfolio:99VXbK5jWTVPMLP3@cluster0.bwb48.mongodb.net/test";
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
