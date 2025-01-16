import e, { Application } from "express";
import userRoutes from "./user";
import bookRoutes from "./book";
export const initialisedRoutes = (app: Application) => {
  app.use("/user", userRoutes);
  app.use("/ping", (req, res) => {
    res.send("Pong");
  });

  app.use("/book", bookRoutes);
};

export default initialisedRoutes;
