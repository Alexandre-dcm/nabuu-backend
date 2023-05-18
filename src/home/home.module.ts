import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";


@Module({
    imports: [PrismaModule],
    controllers: [HomeController],
    providers: [HomeService],
    exports: [HomeService]
  })
export class HomeModule {}