import { Injectable } from '@nestjs/common';

// <-- Padrão 1: SINGLETON
// O Nest.js garante que apenas UMA instância deste
// ConfigService existirá em toda a aplicação.
// Todos os módulos que o importarem receberão a MESMA instância.

@Injectable()
export class ConfigService {
  private readonly config: Record<string, string>;

  constructor() {
    // Em um projeto real, leríamos do .env (ex: com @nestjs/config)
    this.config = {
      EMAIL_PROVIDER: 'sendgrid', // Altere para 'log' para ver a Factory funcionar
      SENDGRID_API_KEY: 'SG.fake-api-key-12345',
      TWILIO_SID: 'TW.fake-sid-67890',
      TWILIO_AUTH_TOKEN: 'fake-auth-token-abcde',
    };
    console.log('[Singleton] ConfigService instanciado UMA VEZ.');
  }

  get(key: string): string {
    return this.config[key];
  }
}