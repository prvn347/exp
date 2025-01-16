
import { Request, Router, Response } from "express";
import { userControllers } from "../controllers/user";
import { AuthRequest, user } from "../middleware/user";

const userRoutes = Router();
const userController = new userControllers();
userRoutes.post(
  "/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const resp = await userController.createUser(req.body);
      if (resp instanceof Error) {
        return res.status(400).json({ error: resp.message });
      }

      res.status(200).send(resp);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

userRoutes.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const resp = await userController.loginUser(req.body);
    if (resp instanceof Error) {
      return res.status(400).json({ error: resp.message });
    }
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});



export default userRoutes