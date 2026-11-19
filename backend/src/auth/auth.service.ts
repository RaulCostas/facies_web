import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(private prisma: PrismaService) {
    nodemailer.createTestAccount().then((account) => {
      this.transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      console.log('Ethereal Email configurado para pruebas. User:', account.user);
    });
  }

  private getDefaultAdminEmails(): string[] {
    return (process.env.ADMIN_EMAILS || 'raul@gmail.com,raul@gmail,raulcostas@gmail.com,admin@faciesdentium.com')
      .split(',')
      .map((e) => e.trim().toLowerCase());
  }

  async sendMagicLink(email: string) {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const defaultAdmins = this.getDefaultAdminEmails();
      const isDefaultAdmin = defaultAdmins.includes(normalizedEmail);

      let user = await this.prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: normalizedEmail,
            role: isDefaultAdmin ? 'ADMIN' : 'VIEWER',
          },
        });
      } else if (isDefaultAdmin && user.role !== 'ADMIN') {
        user = await this.prisma.user.update({
          where: { email: normalizedEmail },
          data: { role: 'ADMIN' },
        });
      }

      const isEditor = user.role === 'ADMIN' || user.role === 'EDITOR' || isDefaultAdmin;

      // Generar link mágico simulado
      const mockToken = Buffer.from(user.id).toString('base64');
      const magicLink = `http://localhost:5173/auth/verify?token=${mockToken}`;

      if (this.transporter) {
        this.transporter
          .sendMail({
            from: '"Facies Dentium" <no-reply@faciesdentium.com>',
            to: normalizedEmail,
            subject: 'Tu enlace de acceso a Protocolos Clínicos',
            text: `Hola, ingresa a la plataforma usando el siguiente enlace: ${magicLink}`,
            html: `
            <div style="font-family: sans-serif; text-align: center; padding: 40px; background-color: #f9f9f9;">
              <h1 style="color: #2563eb;">FACIES DENTIUM</h1>
              <p>Has solicitado acceso a los Protocolos Clínicos.</p>
              <a href="${magicLink}" style="display: inline-block; padding: 12px 24px; margin-top: 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Acceder a Protocolos
              </a>
              <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">Este enlace expirará pronto.</p>
            </div>
          `,
          })
          .then((info) => {
            console.log('Mensaje enviado: %s', info.messageId);
          })
          .catch((err) => {
            console.warn('Advertencia al enviar correo en segundo plano:', err.message);
          });
      }

      return {
        success: true,
        message: 'Acceso concedido exitosamente',
        userId: user.id,
        email: user.email,
        role: user.role,
        isEditor,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al procesar el acceso');
    }
  }

  async checkEditorStatus(email: string) {
    if (!email) return { isEditor: false, role: 'VIEWER' };
    const normalizedEmail = email.trim().toLowerCase();
    const defaultAdmins = this.getDefaultAdminEmails();
    const isDefaultAdmin = defaultAdmins.includes(normalizedEmail);

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    const isEditor =
      (user && (user.role === 'ADMIN' || user.role === 'EDITOR')) || isDefaultAdmin;

    return {
      isEditor: Boolean(isEditor),
      role: user?.role || (isDefaultAdmin ? 'ADMIN' : 'VIEWER'),
    };
  }

  async getUsersList(password: string) {
    if (password !== 'admin123') {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async toggleUserRole(password: string, email: string, role: string) {
    if (password !== 'admin123') {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return this.prisma.user.update({
      where: { email },
      data: { role },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
