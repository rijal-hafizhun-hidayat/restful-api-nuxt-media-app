import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { userMiddleware } from "../middleware/user-middleware";
import { AuthController } from "../controller/auth-controller";
import { ProfileController } from "../controller/profile-controller";
import { PostController } from "../controller/post-controller";

const apiRoute = express.Router();

apiRoute.use(authMiddleware);
apiRoute.use(userMiddleware);

apiRoute.get("/api/me", AuthController.getMe);
apiRoute.get("/api/profile", ProfileController.getProfile);
apiRoute.patch("/api/profile/update-name", ProfileController.updateProfileName);
apiRoute.patch(
  "/api/profile/update-email",
  ProfileController.updateProfileEmail
);
apiRoute.patch(
  "/api/profile/update-password",
  ProfileController.updateProfilePassword
);
apiRoute.patch("/api/profile/verif", ProfileController.verifProfile);
apiRoute.patch("/api/profile/update-bio", ProfileController.updateProfileBio);

export { apiRoute };
