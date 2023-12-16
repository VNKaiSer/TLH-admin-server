import { PrismaService } from 'src/prisma/prisma.service';

export type Tx = Omit<
  PrismaService,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export type Respone = {
  success: boolean;
  message: string;
  status: number;
  data?: any;
};
