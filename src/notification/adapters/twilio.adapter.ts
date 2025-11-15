import { Injectable } from '@nestjs/common';
import { ISmsProvider } from '../interfaces/sms-provider.interface';
import { ConfigService } from '../../config/config.service';

// <-- Padrão 2: ADAPTER
// Adapta nossa interface ISmsProvider para a API do Twilio.

@Injectable()
export class TwilioAdapter implements ISmsProvider {
  private sid: string;
  private token: string;

  constructor(private readonly configService: ConfigService) {
    this.sid = this.configService.get('TWILIO_SID');
    this.token = this.configService.get('TWILIO_AUTH_TOKEN');
    console.log(`[Adapter] TwilioAdapter inicializado.`);
  }

  async send(to: string, message: string): Promise<void> {
    console.log('--- ENVIANDO SMS COM TWILIO ---');
    console.log(`(Usando SID: ${this.sid}...)`);
    console.log(`Para: ${to}`);
    console.log(`Mensagem: ${message}`);
    console.log('-------------------------------');
    // Aqui iria a lógica real do SDK do Twilio
    // ex: twilio.messages.create({ to, from, body: message })
  }
}