import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.PORT,
    APP_HOST: process.env.HOST,
    SECRET_KEY: process.env.ACCESS_SECRET_KEY || "",
    REFRESH_KEY: process.env.REFRESH_SECRET_KEY || "",
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE || 900000,
    // 15 minutes
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || "3d",
  },
  MONGO_URL: {
    String: process.env.MONGO_URL || "",
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.CLOUD_API_KEY,
    API_SECRET: process.env.CLOUD_API_SECRET,
    FOLDER_NAME: process.env.CLOUD_FOLDER_NAME,
  },
  OUTLOOK: {
    USER: process.env.MAIL_USER,
    PASSWORD: process.env.MAIL_PASSWORD,
  },
  hostname: "http://localhost:3015"
}