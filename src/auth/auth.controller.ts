import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() data: RegisterDto){
        return await this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: LoginDto){
        return await this.authService.login(data);
    }

    @Get('profile')
    async profile() {
        return "detail user"
    }
}
