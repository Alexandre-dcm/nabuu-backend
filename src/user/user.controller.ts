import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}
