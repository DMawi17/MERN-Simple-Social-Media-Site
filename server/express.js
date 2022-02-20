import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import Template from "./../template";

const app = express();

/*... CONFIGURE [express]... */

app.use(express.json()); // body-parsing middleware
// app.use(express.urlencoded({ extended: true })); // FIXME:
app.use(cookieParser()); // parse and set cookies in request objects.
app.use(compress()); // compress response bodies for all requests
app.use(helmet()); // help secure Express apps by setting various HTTP headers.
app.use(cors()); // enable cross-origin resource sharing (CORS)

app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.status(200).send(Template());
});

/* ... AUTH ERROR HANDLING FOR [express-jwt] ... 

To handle auth-related errors thrown by express-jwt when it tries to validate JWT tokens in incoming requests, we need to add the following error-catching code 
*/
app.use((err, req, res, next) => {
    // express-jwt throws an error named UnauthorizedError when a token cannot be validated for some reason.
    if (err.name === "UnauthorizedError") {
        // We catch this error here to return a 401 status back to the requesting client.
        res.status(401).json({ error: err.name + ": " + err.message });
    } else if (err) {
        // We also add a response to be sent if other server-side errors are generated and caught here.
        res.status(400).json({ error: err.name + ": " + err.message });
        console.log(err);
    }
});

export default app;
