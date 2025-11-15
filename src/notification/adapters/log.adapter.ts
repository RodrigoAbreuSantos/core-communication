import { Injectable } from '@nestjs/common';
import { IEmailProvider } from '../interfaces/email-provider.interface';

// <-- Padrão 2: ADAPTER
// Outra implementação da MESMA interface,
// mas que apenas loga no console.

@Injectable()
export class LogEmailAdapter implements IEmailProvider {
  constructor() {
    console.log(`[Adapter] LogEmailAdapter inicializado.`);
  }

  async send(to: string, subject: string, body: string): Promise<void> {
    console.log('--- ENVIANDO E-MAIL (LOG) ---');
    console.log(`Para: ${to}`);
    console.log(`Assunto: ${subject}`);
    console.log(`Corpo: ${body}`);
    console.log('-----------------------------');
  }
}