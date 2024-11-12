import express from "express";
import { StorageController } from "../controller/storage-controller";
import { uploadProfile } from "../upload/upload-profile";
import { authMiddleware } from "../middleware/auth-middleware";
import { uploadPostFile } from "../upload/upload-post-file";

const storageRoute = express();

storageRoute.use("/api/storage/profile", express.static("src/storage/profile"));
storageRoute.patch(
  "/api/storage/user/:userId/avatar",
  uploadProfile.single("file"),
  authMiddleware,
  StorageController.updateUserAvatarByUserId
);
storageRoute.patch(
  "/api/storage/post_file/:postId/file",
  uploadPostFile.single("file"),
  authMiddleware,
  StorageController.updatePostFileFileByPostId
);

export { storageRoute };
