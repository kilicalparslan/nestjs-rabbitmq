import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PAYMENT_CLIENT) private readonly paymentClient: ClientProxy,
    @Inject(NOTIFICATION_CLIENT)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order) {
    console.log('Received order:', order);

    this.paymentClient.emit('process-payment', order);
    this.notificationClient.emit('order-created', order);
  }
}
