// src/app/testConnection.ts
import { connectToDatabase } from '../../lib/mongodb';

const test = async () => {
  try {
    const connection = await connectToDatabase();
    console.log("✅ MongoDB connected successfully to host:", connection.host);
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

test();
