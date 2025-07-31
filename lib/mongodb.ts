import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://malaikakhan1319:VREA4KMvtsHmORks@mental-health-tracker.lcug3bu.mongodb.net/?retryWrites=true&w=majority&appName=mental-health-tracker';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(() => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
