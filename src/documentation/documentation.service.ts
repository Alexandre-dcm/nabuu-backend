import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentationDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tools } from 'src/utils/tools';
import { Status } from 'src/utils/status';

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
        let slug = null;
        const status = Number(dto.status);

        if (status === Status.STATUS_PUBLIC) {
            slug = await this.setDocumentationSlug(dto.name);
        }

        try {
            const doc = await this.prisma.documentation.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    htmlContent: dto.htmlContent,
                    status: status,
                    slug: slug
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

    async setDocumentationSlug(str: string) {
        let slug = Tools.slugify(str);

        let extraNumber = 1;
        let tries = 1;
        let existingDoc = true;
        const tryLimit = 10; // Avoiding an infinite loop

        while (existingDoc && tries <= tryLimit) {
            try {
                // Checking if slug already exists
                let existingDoc = await this.prisma.documentation.findUnique({
                    where: {
                        slug: slug
                    }
                });
    
                // Adding an extra number at end of slug
                if (existingDoc) {                                        
                    const parts = existingDoc.slug.split('-');
                    let lastPart: any = parts[parts.length - 1];

                    if (!isNaN(lastPart as any)) {                        
                        // If existing doc already has an extra number, we increment it
                        lastPart = (Number(lastPart) + 1).toString();
                        parts[parts.length -1] = lastPart;

                        slug = parts.join('-'); 
                    } else {                                    
                        slug = slug + '-' + extraNumber.toString(); 
                    }
                }
            } catch (e) {
                throw e;
            }
            
            tries++;
        }

        return slug;
    }
}