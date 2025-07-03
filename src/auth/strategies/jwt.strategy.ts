import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

// Interfaz para el payload del JWT
interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Estrategia JWT para Passport
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization
            ignoreExpiration: false, // No ignora la expiración
            secretOrKey: process.env.JWT_SECRET || 'default_jwt_secret' // Usa variable de entorno o valor por defecto
        })
    }

    // Valida el payload del token y lo retorna como usuario autenticado
    validate (payload: JwtPayload): JwtPayload {
        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        };
    }
}