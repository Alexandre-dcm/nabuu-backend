import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocumentationModule } from './documentation/documentation.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentationController } from './documentation/documentation.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule, 
    DocumentationModule, 
    PrismaModule,
    DocumentationModule
  ],
  controllers: [DocumentationController] 
})
export class AppModule {

}
