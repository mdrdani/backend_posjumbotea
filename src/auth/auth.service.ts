import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/RegisterDto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/LoginDto';
import { jwt_config } from 'src/config/jwt_config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async register(data: RegisterDto){
        const checkUserExists = await this.prisma.users.findFirst({
            where: {
                email: data.email
            }
        })

        if(checkUserExists){
            throw new HttpException('user already exists', HttpStatus.FOUND)
        }

        data.password = await hash(data.password, 12)
        const createUser = await this.prisma.users.create({
            data: data
        })

        if(createUser){
            return {
                statusCode: HttpStatus.OK,
                message: 'User Created Successfully'
            }
        }

    }

    generateJWT(payload: any){
        return this.jwtService.sign(payload, {
            secret: jwt_config.secret,
            expiresIn: jwt_config.expired
        })
    }

    async login(data: LoginDto){
        const checkUserExists = await this.prisma.users.findFirst({
            where: {
                email: data.email
            }
        })

        if(!checkUserExists){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const checkPassword = await compare(data.password, checkUserExists.password)
        if(checkPassword){
            const accessToken = this.generateJWT({
                sub: checkUserExists.id,
                name: checkUserExists.name,
                email: checkUserExists.email
            })
            return{
                statusCode: 200,
                message: 'Login Successfully',
                accessToken: accessToken
            }
        }else{
            throw new HttpException('user or password not match', HttpStatus.UNAUTHORIZED)
        }
    }
}
