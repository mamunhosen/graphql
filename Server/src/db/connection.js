import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const mongo_uri =
      process.env.MONGO_URI || "mongodb://db:27017/locale_information";
    console.log("Connecting to MongoDB...", mongo_uri);
    await mongoose.connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectToMongo;
