import { Body, Controller, Get, Post, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { endWith } from 'rxjs';
import { DocumentationDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { DocumentationService } from './documentation.service';

@Controller('docs')
export class DocumentationController {
    constructor(private documentationService: DocumentationService) {}

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        console.log("slug", slug);
        
        return this.documentationService.findOne(slug);
    }

    @Get('')
    findAll() {
        return this.documentationService.findAll();
    }

    @UseGuards(JwtGuard)
    @Post('new') 
    newDoc(@Body() dto: DocumentationDto) {
        return this.documentationService.new(dto);
    }

    @UseGuards(JwtGuard)
    @Patch(':id') 
    edit(@Param() params: { id: string }, @Body() dto: DocumentationDto) {  
        // Todo : Make sure user is owner of documentation or admin      
        return this.documentationService.edit(dto, Number(params.id));
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteOne(@Param() params: { id: string }) {
        // Todo : Make sure user is owner of documentation or admin
        return this.documentationService.deleteOne(Number(params.id));
    }
}
