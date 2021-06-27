import morgan from "morgan";
import express from "express";
import "./database";
import config from "./config";
import cors from "cors";

// Imports routes
import usersRoutes from "./modules/user";

const app = express();

// Settings
app.set("port", config.PORT);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", usersRoutes);

app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
