import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';


@Controller('')
export class HomeController {
    constructor(private homeService: HomeService) {}

    @Get('')
    index() {
        return this.homeService.index();
    }
}
