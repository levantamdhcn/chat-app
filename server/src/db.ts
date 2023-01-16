import mongoose from "mongoose";
import config from "./config";
const CONNECT = async (): Promise<object> => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', false); //debug

    const db = mongoose.connection;
    db.on('error', (error) => {
      reject(error);
    });
    db.once("open", () => {
      resolve(mongoose.connection);
    })
    mongoose.connect(config.MONGO_URL.String, {
      serverSelectionTimeoutMS: 5000,
    });
  });
};

export = CONNECT;