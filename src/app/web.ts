import express from "express";
import cors from "cors";
import { publicApi } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRoute } from "../router/api";

const web = express();
const corsOrigin = {
  origin: "http://localhost:3000", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

web.use(cors(corsOrigin));
web.use(express.json());
web.use(publicApi);
web.use(apiRoute);
web.use(errorMiddleware);

export { web };
