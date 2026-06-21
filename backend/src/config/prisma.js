require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const databaseUrl = process.env.DATABASE_URL || "mysql://root:@localhost:3306/stress_detection";
const parsedUrl = new URL(databaseUrl);
const database = parsedUrl.pathname?.replace(/^\//, "") || "stress_detection";

const adapter = new PrismaMariaDb({
    host: parsedUrl.hostname,
    port: Number(parsedUrl.port || 3306),
    user: parsedUrl.username || "root",
    password: parsedUrl.password || "",
    database,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({
    adapter,
});

module.exports = prisma;