import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ProtocolsService } from './protocols.service.js';

@Controller('protocols')
export class ProtocolsController {
  constructor(private readonly protocolsService: ProtocolsService) {}

  @Get()
  async getAll() {
    return this.protocolsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.protocolsService.getOne(id);
  }

  @Put(':id')
  async save(
    @Param('id') id: string,
    @Body('content') content: string,
    @Body('title') title?: string,
    @Body('email') email?: string,
    @Body('userEmail') userEmail?: string,
  ) {
    const finalEmail = userEmail || email;
    return this.protocolsService.save(id, content, title, finalEmail);
  }
}
