import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProtocolsModule } from './protocols/protocols.module.js';

@Module({
  imports: [AuthModule, PrismaModule, ProtocolsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
