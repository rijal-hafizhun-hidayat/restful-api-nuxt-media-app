import express from "express";
import { RegisterController } from "../controller/register-controller";
import { AuthController } from "../controller/auth-controller";

const publicApi = express();

publicApi.post("/api/register", RegisterController.register);
publicApi.post("/api/login", AuthController.login);

export { publicApi };
