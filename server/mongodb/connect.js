import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("Failed to connect to database");
      console.log(err);
    });
};

export default connectDB;
