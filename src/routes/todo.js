import express from "express";
import { createToDo, getToDo, updateToDo, deleteToDo } from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/", createToDo);
router.get("/", getToDo);
router.patch("/:id", updateToDo);
router.delete("/:id", deleteToDo);

export default router;

