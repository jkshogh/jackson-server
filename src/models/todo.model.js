import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


//Create the db record
export const create = async (authorId, task) => {
    const createtodo = await prisma.todo.create({
        data:{
            authorId: authorId*1,
            task: task,
        }
    });

    console.log("Created todo:", createtodo);

    return createtodo
}

//Get db record
export const getAll = async (authorId, task) => {
    const todolist = await prisma.todo.findMany({
        include: {
            author: true,
        }
    });

    console.log("Get todo:", todolist);

    return todolist;
}

// Update db record
export const updatedb = async (id, completed) => {
    const updateStatus = await prisma.todo.update({
        where: {
            id: id,
        },
        data: {
            completed: completed,
        }
    });

    console.log("Update todo:", updateStatus);

    return updateStatus;
}

// Delete db record
export const deletedb = async (id) => {
    const deleteStatus = await prisma.todo.delete({
        where: {
            id: id,
        },
    });

    console.log("Delete todo:", deleteStatus);

    return deleteStatus;
}

