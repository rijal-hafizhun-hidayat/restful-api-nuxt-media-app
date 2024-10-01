import express from "express";
import { RegisterController } from "../controller/register-controller";

const publicApi = express();

publicApi.post("/api/register", RegisterController.register);

export { publicApi };
