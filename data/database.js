import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("yes connected to mongo db data base");
};

// process.env.MONGO_URL
