import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { config } from "process";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService, 
        private config: ConfigService) {}

    async signUp(dto: AuthDto) {    
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });

            if (user) {
                throw new ForbiddenException("User already exists");
            }

            const hashPassword = await argon.hash(dto.password);
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hashPassword: hashPassword,
                }
            })
    
            return this.signToken(user.id, user.email);
        } catch (e) {
            throw e;
        }
    }

    async signIn(dto: AuthDto) {
        const badCredentialsError = new ForbiddenException("Credentials incorrect");

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        
        if (!user) {
            throw badCredentialsError;
        }

        const pwMatches = await argon.verify(user.hashPassword, dto.password);

        if (!pwMatches) {
            throw badCredentialsError;
        }
        
        return this.signToken(user.id, user.email);
    }

    signToken(userId: number, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email: email
        }

        return this.jwt.signAsync(payload, {
            expiresIn: '60m',
            secret: this.config.get('JWT_SECRET')
        });
    }
}