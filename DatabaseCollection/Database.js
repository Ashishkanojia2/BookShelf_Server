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

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // Ensure dotenv is configured correctly

// export const databaseConnection = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI;
//     if (!mongoURI) {
//       throw new Error("MONGO_URI is not defined");
//     }

//     const { connection } = await mongoose.connect(mongoURI);

//     console.log(
//       `This connection is made for database with host name: ${connection.host}`
//     );
//   } catch (error) {
//     console.log("This error is coming from database connection file", error);
//   }
// };
