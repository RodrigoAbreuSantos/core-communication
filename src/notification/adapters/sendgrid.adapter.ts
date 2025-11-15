import { Injectable } from '@nestjs/common';
import { IEmailProvider } from '../interfaces/email-provider.interface';
import { ConfigService } from '../../config/config.service';

// <-- Padrão 2: ADAPTER
// Esta classe "adapta" nossa interface IEmailProvider
// para o SDK (falso) ou API do SendGrid.

@Injectable()
export class SendGridAdapter implements IEmailProvider {
  private apiKey: string;

  constructor(
    // Recebe o Singleton ConfigService
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get('SENDGRID_API_KEY');
    console.log(`[Adapter] SendGridAdapter inicializado.`);
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    console.log('--- ENVIANDO E-MAIL COM SENDGRID ---');
    console.log(`(Usando API Key: ${this.apiKey.substring(0, 10)}...)`);
    console.log(`Para: ${to}`);
    console.log(`Assunto: ${subject}`);
    console.log(`Corpo: ${body}`);
    console.log('------------------------------------');
    // Aqui iria a lógica real do SDK do SendGrid
    // ex: sendgrid.send({ to, from, subject, html: body })
  }
}