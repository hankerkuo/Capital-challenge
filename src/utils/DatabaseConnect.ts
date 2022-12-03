import { PrismaClient } from '@prisma/client';

declare namespace NodeJS {
  interface Global {
    prisma: PrismaClient
  }
}
declare var global: NodeJS.Global & typeof globalThis

export default class DatabaseConnect {

  prismaClient;

  constructor() {
    this.prismaClient = global.prisma || new PrismaClient();
    if (process.env.NODE_ENV === 'development') {
      global.prisma = this.prismaClient;
    }
  }

}




