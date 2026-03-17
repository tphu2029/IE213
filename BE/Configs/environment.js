import "dotenv/config";

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
