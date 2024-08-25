import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase the timeout
      socketTimeoutMS: 45000,
    });
    console.log(
      `this connection is made for database with host name is ${connection.host}`
    );
  } catch (error) {
    console.log("This error is come from database connection file", error);
  }
};

