import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwt_config } from "src/config/jwt_config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwt_config.secret
        })
    }

    async validate(payload: any){
        // console.log('JWT Payload:', payload); // Tambahkan logging di sini
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
            expired: payload.exp
        }
    }
}