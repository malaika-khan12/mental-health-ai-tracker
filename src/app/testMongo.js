// src/app/testMongo.js
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://malaikakhan1319:VREA4KMvtsHmORks@mental-health-tracker.lcug3bu.mongodb.net/?retryWrites=true&w=majority&appName=mental-health-tracker";

async function testMongo() {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully:", connection.connection.host);
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

testMongo();
