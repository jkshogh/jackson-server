import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

import { create, getAll, updatedb, deletedb } from '../models/todo.model.js';


//Create
export const createToDo = async (req, res) => {
    const authorId = req.body.authorId;
    const task = req.body.task;
    const todo = await create(authorId, task);
    
    res.json(todo); 
}

//Get 
export const getToDo = async (req, res) => {
    const alltodolist = await getAll();
        
    res.json(alltodolist); 
}

//Update 
export const updateToDo = async (req, res) => {
    const id = parseInt(req.params.id);
    const status = req.body.completed;
    const updatetodolist = await updatedb(id, status);
        
    res.json(updatetodolist); 
}

// Delete 
export const deleteToDo = async (req, res) => {
    const id = parseInt(req.params.id);
    const deletetodolist = await deletedb(id);
        
    res.json(deletetodolist); 
}