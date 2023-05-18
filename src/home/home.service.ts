import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService
        ) {}

    index() {
        return { "message": "WIP" }
    }
}
