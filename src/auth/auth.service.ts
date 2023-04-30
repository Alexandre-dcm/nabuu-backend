import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signUp(dto: AuthDto) {    
        try {
            const hashPassword = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hashPassword: hashPassword,
                }
            })
    
            delete user.hashPassword;
            return user;
        } catch (e) {
            throw e;
        }
    }

    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        
        if (!user) {
            throw new ForbiddenException("Credentials incorrect");
        }

        const pwMatches = await argon.verify(user.hashPassword, dto.password);

        if (!pwMatches) {
            throw new ForbiddenException("Credentials incorrect");
        }

        delete user.hashPassword;
        return user;
    }
}