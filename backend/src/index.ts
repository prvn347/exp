import express from "express";
import cors from "cors";
import { initialisedRoutes } from "./routes";
import dotenv from "dotenv";
import {limiter} from "./utils/ratelimit";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

const startServer = () => {
  app.use(express.json());
  app.use(cors());
  app.use(limiter)
  app.use(express.urlencoded({ extended: false }));

  initialisedRoutes(app)


  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
};

startServer();