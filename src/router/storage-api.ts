import express from "express";

const storageRoute = express();

storageRoute.use("/api/storage/profile", express.static("src/storage/profile"));

export { storageRoute };
