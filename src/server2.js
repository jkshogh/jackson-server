import express from 'express';

const app = express();
const port = 3000;

import klookRouter from './routes/klook.js';
import formRouter from './routes/forms.js';
import todoRouter from './routes/todo.js';

import bodyParser from 'body-parser';
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
