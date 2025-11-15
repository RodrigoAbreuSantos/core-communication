export interface ISmsProvider {
  send(to: string, message: string): Promise<void>;
}

// Token para injeção de dependência
export const SMS_PROVIDER_TOKEN = 'SMS_PROVIDER';