import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import Template from "./../template";
import devBundle from "./devBundle";
import path from 'path'

const app = express();
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.status(200).send(Template());
});

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: err.name + ": " + err.message });
    } else if (err) {
        res.status(400).json({ error: err.name + ": " + err.message });
        console.log(err);
    }
});

export default app;
