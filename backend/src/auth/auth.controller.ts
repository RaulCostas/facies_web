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

  @Post('check-editor')
  async checkEditor(@Body('email') email: string) {
    return this.authService.checkEditorStatus(email);
  }

  @Post('admin/users')
  async getAdminUsers(@Body('password') password: string) {
    return this.authService.getUsersList(password);
  }

  @Post('admin/toggle-role')
  async toggleRole(
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('role') role: string,
  ) {
    return this.authService.toggleUserRole(password, email, role);
  }
}
