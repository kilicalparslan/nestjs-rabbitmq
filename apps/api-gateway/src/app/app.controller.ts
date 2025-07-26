import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE } from '../constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(ORDER_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('order')
  createOrder(@Body() order: any) {
    this.client.emit('order-created', order);
    return {
      message: 'order sent to rabbitmq',
      order,
    };
  }
}
