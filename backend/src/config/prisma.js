require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "root",
    database: "stress_detection_db",
    connectionLimit: 5,
});

const prisma = new PrismaClient({
    adapter,
});

module.exports = prisma;