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

    async findOne(slug: string) {
        const doc = await this.prisma.documentation.findUnique({
            where: {
                slug: slug
            }
        });

        
        if (!doc) {
            throw new NotFoundException;
        }

        return doc;
    }

    findAll() {
        const docs = this.prisma.documentation.findMany();

        return docs;
    }

    async new(dto: DocumentationDto) {
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

    async edit(dto: DocumentationDto, id: number) {
        // We can only edit HTMLcontent, description and name for now.        
        try {
            const doc = await this.prisma.documentation.update({
                where: {
                    id: id
                },
                data: {
                    name: dto.name,
                    htmlContent: dto.htmlContent,
                    description: dto.description
                }
            });

            return doc;
        } catch (e) {
            throw e;
        }
    }

    async deleteOne(id: number) {
        try {
            const result = await this.prisma.documentation.delete({
                where: {
                    id: id
                }
            });

            return result;
        } catch (e) {
            throw new NotFoundException;
        }
    }
}