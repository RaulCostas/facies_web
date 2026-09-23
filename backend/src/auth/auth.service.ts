import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(private prisma: PrismaService) {
    // Usaremos Ethereal para pruebas iniciales como acordamos
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

  async sendMagicLink(email: string) {
    try {
      // 1. Guardar o encontrar el usuario en la BD de forma inmediata
      const user = await this.prisma.user.upsert({
        where: { email },
        update: {},
        create: { email },
      });

      // 2. Generar un link mágico simulado
      const mockToken = Buffer.from(user.id).toString('base64');
      const magicLink = `http://localhost:5173/auth/verify?token=${mockToken}`;

      // 3. Enviar correo en segundo plano (asíncrono sin bloquear la respuesta al usuario)
      if (this.transporter) {
        this.transporter.sendMail({
          from: '"Facies Dentium" <no-reply@faciesdentium.com>',
          to: email,
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
        }).then((info) => {
          console.log('Mensaje enviado: %s', info.messageId);
        }).catch((err) => {
          console.warn('Advertencia al enviar correo en segundo plano:', err.message);
        });
      }

      // Retornar respuesta inmediata al frontend en < 10ms
      return {
        success: true,
        message: 'Acceso concedido exitosamente',
        userId: user.id
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al procesar el acceso');
    }
  }

  async getUsersList(password: string) {
    if (password !== 'admin123') {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return this.prisma.user.findMany({
      select: {
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
