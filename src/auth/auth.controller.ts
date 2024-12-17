import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';
import { AuthGuard } from './auth.guard';

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

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Req() req) {
        return await this.authService.profile(req.user.id)
    }

    @UseGuards(AuthGuard)
    @Get('users')
    async users(){
        return await this.authService.allUser()
    }
}
