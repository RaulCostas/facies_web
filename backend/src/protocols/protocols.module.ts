import { Module } from '@nestjs/common';
import { ProtocolsController } from './protocols.controller.js';
import { ProtocolsService } from './protocols.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ProtocolsController],
  providers: [ProtocolsService],
  exports: [ProtocolsService],
})
export class ProtocolsModule {}
