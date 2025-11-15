import { Module } from '@nestjs/common';

import { ConfigService } from '../config/config.service';

// Tokens
import { EMAIL_PROVIDER_TOKEN } from './interfaces/email-provider.interface';
import { SMS_PROVIDER_TOKEN } from './interfaces/sms-provider.interface';

// Adapters
import { LogEmailAdapter } from './adapters/log.adapter';
import { TwilioAdapter } from './adapters/twilio.adapter';
import { NotificationService } from './notification.service';
import { UserCreatedListener } from './listeners/user-created.listener';
import { NotificationController } from './notification.controller';
import { SendGridAdapter } from './adapters/sendgrid.adapter';

// Listener do Observer

// <-- Padrão 3: FACTORY METHOD
// Esta factory decide QUAL implementação de IEmailProvider será criada
// com base na configuração do ConfigService.
const emailProviderFactory = {
  provide: EMAIL_PROVIDER_TOKEN,
  useFactory: (configService: ConfigService) => {
    const provider = configService.get('EMAIL_PROVIDER');
    if (provider === 'sendgrid') {
      return new SendGridAdapter(configService);
    }
    // Por padrão, usa o LogEmailAdapter
    return new LogEmailAdapter();
  },
  inject: [ConfigService], // A factory precisa do ConfigService
};

// Factory para o SMS Provider (aqui só temos um, mas segue o padrão)
const smsProviderFactory = {
  provide: SMS_PROVIDER_TOKEN,
  useFactory: (configService: ConfigService) => {
    return new TwilioAdapter(configService);
  },
  inject: [ConfigService],
};

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    UserCreatedListener, // Registra o Listener (Observer)
    emailProviderFactory, // Provê o resultado da Factory
    smsProviderFactory, // Provê o resultado da Factory
  ],
})
export class NotificationModule {}