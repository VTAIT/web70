import express from "express";
import route from "./routes/index.js";

const app = express();
const port = 5001;

app.use(express.json());

app.use('/api', route);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})