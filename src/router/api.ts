import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { userMiddleware } from "../middleware/user-middleware";

const apiRoute = express.Router();

apiRoute.use(authMiddleware);
apiRoute.use(userMiddleware);

apiRoute.get(
  "/api/profile",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      return res.status(200).json({
        data: (req as any).currentUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { apiRoute };
