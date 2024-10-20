import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { userMiddleware } from "../middleware/user-middleware";
import { AuthController } from "../controller/auth-controller";
import { ProfileController } from "../controller/profile-controller";
import { uploadProfile } from "../upload/upload-profile";
import { PostController } from "../controller/post-controller";
import { PostLikeController } from "../controller/post-like-controller";
import { PostCommentController } from "../controller/post-comment-controller";
import { NotificationController } from "../controller/notification-controller";

const apiRoute = express.Router();

apiRoute.use(authMiddleware);
apiRoute.use(userMiddleware);

//start api profile
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
apiRoute.patch(
  "/api/profile/update-avatar",
  uploadProfile.single("file"),
  ProfileController.updateProfileAvatar
);
apiRoute.get("/api/profile/post", ProfileController.getAllPostByCurrentUser);
apiRoute.get("/api/profile/:userId", ProfileController.getProfileByUserId);
apiRoute.get("/api/profile/:userId/post", ProfileController.getAllPostByUserId);
//end api profile

//start api post
apiRoute.get("/api/post", PostController.getAllByUserId);
apiRoute.post("/api/post", PostController.storePostByUserId);
apiRoute.post("/api/post/:postId/like", PostLikeController.storePostLike);
apiRoute.delete("/api/post/:postId/unlike", PostLikeController.destroyPostLike);
apiRoute.get(
  "/api/post/:postId/comment",
  PostCommentController.getAllPostCommentByPostId
);
apiRoute.post(
  "/api/post/:postId/comment",
  PostCommentController.storePostCommentByPostId
);
//end api post

//start api notification
apiRoute.get(
  "/api/notification",
  NotificationController.getAllNotificationByToUserId
);
apiRoute.post("/api/notification", NotificationController.storeNotification);
//end api notification

export { apiRoute };
