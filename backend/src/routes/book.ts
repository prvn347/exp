import { Request, Response, Router } from "express";

const bookRoutes = Router();

bookRoutes.post("/create", async (req:Request, res:Response) => {
  try {
    res.status(200).send("Book created successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
})



export default bookRoutes;