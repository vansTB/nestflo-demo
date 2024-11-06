import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { CallingService } from './calling.service';
@Controller('calling')
export class CallingController {
  constructor(
    private readonly callingService: CallingService,
  ) {}
  @Post('voice')
  async handleVoice(@Body() body: any, @Res() res: Response){
    const user = {
      company:'test_company',
      user:"test_user"
    }
    await this.callingService.createVoice(user,body)
    return 'ok';
  }
  @Post('message')
  async handleMessage(@Body() body: any, @Res() res: Response) {
    const user = {
      company:'test_company',
      user:"test_user"
    }
    await this.callingService.createMessage(user,body)
    return 'ok';
  }
  @Get('/')
  async handleHello() {
    return 'hello calling';
  }
}
