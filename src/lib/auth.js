import { betterAuth } from "better-auth";
import { connectDB } from "./db";

let dbInstance = null;

async function getMongoDb() {
  if (!dbInstance) {
    const conn = await connectDB();
    dbInstance = conn.connection.db;
  }
  return dbInstance;
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: {
    db: await getMongoDb(),
    type: "mongodb",
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: true,
      },
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});
