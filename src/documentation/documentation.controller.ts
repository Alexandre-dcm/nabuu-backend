import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DocumentationDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { DocumentationService } from './documentation.service';

@Controller('docs')
export class DocumentationController {
    constructor(private documentationService: DocumentationService) {}

    @Get(':id')
    findOne(id: number) {
        return this.documentationService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Post('new') 
    newDoc(@Body() dto: DocumentationDto) {
        return this.documentationService.newDoc(dto);
    }
}
