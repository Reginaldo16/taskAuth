import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:password@cluster0.cqbxmqc.mongodb.net/Mern?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );
    console.log(">>>>MongoDB Connected...");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
