import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocumentationModule } from './documentation/documentation.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentationController } from './documentation/documentation.controller';
import { HomeController } from './home/home.controller';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule, 
    DocumentationModule, 
    PrismaModule,
    HomeModule
  ],
  controllers: [DocumentationController, HomeController] 
})
export class AppModule {

}
