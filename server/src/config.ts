import * as dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

export default {
    env: {
        NODE_ENV: process.env.NODE_ENV,
        APP_PORT: process.env.APP_PORT,
        SECRET_KEY: process.env.SECRET_KEY,
    },
    MONGO_URL: {
        String: process.env.MONGO_URL || "",
    }
}