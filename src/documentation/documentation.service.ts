import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentationDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentationService {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService
        ) {}

    findOne(id: number) {
        const doc = this.prisma.documentation.findUnique({
            where: {
                id: id
            }
        });

        if (!doc) {
            throw new NotFoundException;
        }

        return doc;
    }

    async newDoc(dto: DocumentationDto) {
        try {
            const doc = await this.prisma.documentation.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    htmlContent: dto.htmlContent,
                }
            });

            return doc;
        } catch (e) {
            throw e;
        }
    }
}