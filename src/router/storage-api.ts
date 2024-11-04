import express from "express";
import { StorageController } from "../controller/storage-controller";
import { uploadProfile } from "../upload/upload-profile";
import { authMiddleware } from "../middleware/auth-middleware";

const storageRoute = express();

storageRoute.use("/api/storage/profile", express.static("src/storage/profile"));
storageRoute.patch(
  "/api/storage/user/:userId/avatar",
  uploadProfile.single("file"),
  authMiddleware,
  StorageController.updateUserAvatarByUserId
);

export { storageRoute };
