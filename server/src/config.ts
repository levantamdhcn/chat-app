import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
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
  hostname: "http://localhost:3015"
}