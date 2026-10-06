import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

import { getAllFares } from '../models/fares.model.js';
import { getAllPlaces } from '../models/places.model.js';

export const getFares = (req, res) => {
    const allFares = getAllFares();

    res.json({
        data: allFares
    });
}

export const getPlaces = async (req, res) => {
    try {
        const allplaces = getAllPlaces();

        res.set('testing', 5);
        res.json({
            success: true,
            error: { code: "", message: "" },
            result: allplaces,
        });
    } catch (err) {
        res.json({
            success: false,
            error: { code: "", message: "" },
            result: null,
        })
    }
}
