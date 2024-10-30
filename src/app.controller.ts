import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ShortestPathDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shortest')
  findShortestPath(@Body() shortestPathDto: ShortestPathDto) {
    const result = this.appService.findRuteWithGrapho(shortestPathDto);
    return result
  }

}
