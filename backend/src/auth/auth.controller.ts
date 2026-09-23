import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('email') email: string) {
    if (!email) {
      return { error: 'El correo es requerido' };
    }
    return this.authService.sendMagicLink(email);
  }

  @Post('admin/users')
  async getAdminUsers(@Body('password') password: string) {
    return this.authService.getUsersList(password);
  }
}
