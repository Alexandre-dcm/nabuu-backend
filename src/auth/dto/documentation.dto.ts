import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class DocumentationDto {
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsString()
    htmlContent: string;

    @IsString()
    keywords: string;
}