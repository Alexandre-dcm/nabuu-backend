import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DocumentationController } from "./documentation.controller";
import { DocumentationService } from "./documentation.service";


@Module({
    imports: [PrismaModule],
    controllers: [DocumentationController],
    providers: [DocumentationService],
    exports: [DocumentationService]
  })
export class DocumentationModule {}