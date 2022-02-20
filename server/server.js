import express from "express";
import path from "path";
import template from "./../template";
import { MongoClient } from "mongodb";
import devBundle from "./devBundle"; // Only in dev mode, comment out for prod.

const app = express();
devBundle.compile(app); // Only in dev mode, comment out for prod.

const CURRENT_WORKING_DIR = process.cwd();
// Configure the Express app to return static files from the dist folder when the requested route starts with /dist.
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
    res.status(200).send(template());
});

// MONGO
const url =
    "mongodb+srv://DMawi:2KbZNF3TGdlMMJzX@cluster0.mvkgb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";

MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to mongodb server");
    db.close();
});

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info("Server started on port %s.", port);
});
