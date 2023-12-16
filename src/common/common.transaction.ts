// import { Injectable } from '@nestjs/common';
// import { Tx } from './common.type';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class Transaction {
//   constructor(readonly prisma: PrismaService) {}

//   async start<T>(callback: (tx: Tx) => Promise<T>): Promise<T> {
//     const result = await this.prisma.$transaction(async (transaction) => {
//       return await callback(transaction);
//     });

//     return result;
//   }
// }
