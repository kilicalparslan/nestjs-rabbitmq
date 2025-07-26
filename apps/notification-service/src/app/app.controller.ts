import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  sendOrderCreatedMail(@Payload() order) {
    console.log('Sending order created email', order);
  }

  @MessagePattern('payment-succeed')
  sendPaymentSucceedMail(@Payload() order) {
    console.log('Sending payment succeeded email', order);
  }
}
