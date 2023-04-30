import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocumentationModule } from './documentation/documentation.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, DocumentationModule, PrismaModule] 
})
export class AppModule {
  
}
