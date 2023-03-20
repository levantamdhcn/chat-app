import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.PORT,
    APP_HOST: process.env.HOST,
    SECRET_KEY: process.env.SECRET_KEY || "",
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