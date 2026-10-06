import express from 'express';
const router = express.Router();

router.post("/username", (req, res) => {
  const data = req.body;
  res.end(`<h1>Hello ${data.fname} ${data.lname}</h1>`);
});

export default router;