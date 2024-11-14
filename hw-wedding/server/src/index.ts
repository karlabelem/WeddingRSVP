import express, { Express } from "express";
import bodyParser from 'body-parser';
import { getValues } from "./routes";
import { save, load, names } from "./routes";

// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.listen(port, () => console.log(`Server listening on ${port}`));
app.post("/api/save", save);
app.get("/api/load", load);
app.get("/api/names", names);
app.get("/api/getValues", getValues)
