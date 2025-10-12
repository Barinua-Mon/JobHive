import { PrismaClient }  from "@/lib/generated/prisma";
import { withAccelerate }  from "@prisma/extension-accelerate";

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ["query", "error"], // Log queries and errors
}).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;