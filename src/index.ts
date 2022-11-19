import express, { NextFunction, Request, Response } from "express";
import { router as usersRouter } from "./users/users.js";

const app = express();
const port = 8000;
app.get("/someroute", (req, res) => {
    throw new Error("error!!!");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(error.message);
    res.status(402).send(error.message); 
});


app.listen(port, () => {
    console.log(`server is running on: localhost:${port}`);
});

