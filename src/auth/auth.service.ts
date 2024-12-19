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
                email: checkUserExists.email,
                role: checkUserExists.role
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

    async profile(user_id: number){
        const detailProfile = await this.prisma.users.findUnique({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true
            }
        })
        if(detailProfile){
            return {
                statusCode: 200,
                message: 'Detail Profile',
                data: detailProfile
            }
        }
    }

    async allUser(){
        const allUser = await this.prisma.users.findMany({
            where: {
                deletedAt: null
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true
            }
        })
        if(allUser){
            return {
                statusCode: 200,
                message: 'All User',
                data: allUser
            }
        }
    }

    async softDeleteUser(userId: number){
        const user = await this.prisma.users.findUnique({
            where: {id: userId}
        })

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        if(user.deletedAt){
            throw new HttpException('User already deleted', HttpStatus.NOT_FOUND)
        }

        await this.prisma.users.update({
            where: {id: userId},
            data: {deletedAt: new Date()}
        })

        return {
            statusCode: 200,
            message: 'User deleted successfully'
        }
    }
}
