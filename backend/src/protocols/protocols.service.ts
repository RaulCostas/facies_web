import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProtocolsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.protocol.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getOne(id: string) {
    return this.prisma.protocol.findUnique({
      where: { id },
    });
  }

  async save(id: string, content: string, title?: string, userEmail?: string) {
    if (!id || !content) {
      throw new BadRequestException('ID y contenido son requeridos');
    }

    if (!userEmail) {
      throw new UnauthorizedException('Correo de usuario no proporcionado');
    }

    // Verify user role
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });

    const defaultAdminEmails = (process.env.ADMIN_EMAILS || 'raul@gmail.com,raul@gmail,raulcostas@gmail.com,admin@faciesdentium.com')
      .split(',')
      .map((e) => e.trim().toLowerCase());

    const isAuthorized =
      (user && (user.role === 'EDITOR' || user.role === 'ADMIN')) ||
      defaultAdminEmails.includes(userEmail.toLowerCase());

    if (!isAuthorized) {
      throw new UnauthorizedException('No tienes permisos de edición para modificar este protocolo');
    }

    return this.prisma.protocol.upsert({
      where: { id },
      update: {
        content,
        title: title || undefined,
        updatedBy: userEmail,
      },
      create: {
        id,
        title: title || id,
        content,
        updatedBy: userEmail,
      },
    });
  }
}
