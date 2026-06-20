require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    // kalau password kosong, ganti dengan string kosong
    password: process.env.DB_PASSWORD || "",
    database: "stress_detection",
    connectionLimit: 5,
});

const prisma = new PrismaClient({
    adapter,
});

module.exports = prisma;