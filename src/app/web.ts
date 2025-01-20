import express from "express";
import cors, { type CorsOptions } from "cors";
import { publicApi } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRoute } from "../router/api";
import { storageRoute } from "../router/storage-api";

const web = express();

const whitelist: string[] = ["http://localhost:3000", "http://localhost:5173"];
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials if needed
  optionsSuccessStatus: 200, // For legacy browser support
};
// web.use(cookieParser());
web.use(cors(corsOptions));
web.use(express.json());
web.use(storageRoute);
web.use(publicApi);
web.use(apiRoute);
web.use(errorMiddleware);

export { web };
