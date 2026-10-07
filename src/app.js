import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

import klookRouter from './routes/klook.js';
import formRouter from './routes/forms.js';
import todoRouter from './routes/todo.js';

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'https://klook.jkshogh.workers.dev', // Only allow this domain
    optionsSuccessStatus: 200            // For legacy browser support (IE11)
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/klook", klookRouter);

app.use("/form", formRouter);

app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World HAHA!");
});

app.get("/testing", (req, res) => {
  res.json({
    name: "Jackson",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
