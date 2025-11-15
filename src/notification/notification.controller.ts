import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-sms')
  async sendSms(
    @Body('phone') phone: string,
    @Body('message') message: string,
  ) {
    await this.notificationService.sendSms(phone, message);
    return { status: 'SMS Sent' };
  }
}