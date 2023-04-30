const { Controller } = require("@nestjs/common");
import { Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() dto: AuthDto) { 
        return this.authService.signUp(dto);
    }

    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }
}