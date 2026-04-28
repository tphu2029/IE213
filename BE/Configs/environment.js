import "dotenv/config";

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  BANK_ID: process.env.BANK_ID,
  BANK_ACCOUNT: process.env.BANK_ACCOUNT,
  BANK_ACCOUNT_NAME: process.env.BANK_ACCOUNT_NAME,
};
