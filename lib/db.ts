import { PrismaClient } from '@prisma/client'


/// this is for development because during dev it hot reload multiple times
declare global{
    var prisma:PrismaClient | undefined;
}

export const db=globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV!=='production') globalThis.prisma=db;



// in production 
// new PrismaClient()