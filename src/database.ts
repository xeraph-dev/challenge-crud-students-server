import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const options: ConnectionOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // user: config.MONGO_USER,
      // pass: config.MONGO_PASSWORD
    };
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      options
    );
    console.log("database is connected to:", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
