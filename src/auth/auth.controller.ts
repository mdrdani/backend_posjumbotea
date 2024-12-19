import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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

    @UseGuards(new AuthGuard(['ADMIN', 'STAFF', 'USER']))
    @Get('profile')
    async profile(@Req() req) {
        return await this.authService.profile(req.user.id);
    }


    @UseGuards(new AuthGuard(['ADMIN']))
    @Get('users')
    async users(){
        return await this.authService.allUser()
    }

    @UseGuards(new AuthGuard(['ADMIN']))
    @Delete('users/:id')
    async softDeleteUser(@Param('id') id: string){
        const userId = parseInt(id, 10)
        return await this.authService.softDeleteUser(userId)
    }
}