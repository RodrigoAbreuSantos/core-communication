import { Inject, Injectable } from '@nestjs/common';
import * as smsProviderInterface from './interfaces/sms-provider.interface';
import { SMS_PROVIDER_TOKEN } from './interfaces/sms-provider.interface';
import * as emailProviderInterface from './interfaces/email-provider.interface';
import { EMAIL_PROVIDER_TOKEN } from './interfaces/email-provider.interface';



@Injectable()
export class NotificationService {
  constructor(
    // <-- Injetado pela Factory (Padrão 3)
    // <-- Recebe um Adapter (Padrão 2)
    @Inject(EMAIL_PROVIDER_TOKEN)
    private readonly emailProvider: emailProviderInterface.IEmailProvider,

    @Inject(SMS_PROVIDER_TOKEN)
    private readonly smsProvider: smsProviderInterface.ISmsProvider,
  ) {}

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const subject = `Bem-vindo(a), ${name}!`;
    const body = `Olá ${name}, estamos felizes por você se juntar a nós!`;
    
    // Usa a interface genérica. Não sabe se é SendGrid ou Log.
    await this.emailProvider.send(email, subject, body);
  }

  async sendSms(phone: string, message: string): Promise<void> {
    // Usa a interface genérica. Não sabe que é o Twilio.
    await this.smsProvider.send(phone, message);
  }
}