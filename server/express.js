import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();

/*... configure express ... */
app.use(express.json()); // body-parsing middleware
// app.use(bodyParser.urlencoded({ extended: true })) FIXME:
app.use(cookieParser()); // parse and set cookies in request objects.
app.use(compress()); // compress response bodies for all requests
app.use(helmet()); // help secure Express apps by setting various HTTP headers.
app.use(cors()); // enable cross-origin resource sharing (CORS)

export default app;
