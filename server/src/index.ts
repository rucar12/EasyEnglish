import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from "helmet";

import swaggerUi from 'swagger-ui-express';

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import { swaggerDocs } from "./config/swagger";
import cookieParser from "cookie-parser";

dotenv.config()

const app: Express = express();
const port = process.env.PORT;

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", userRoutes);
app.use("/auth", authRoutes);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});