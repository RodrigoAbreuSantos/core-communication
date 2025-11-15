export interface IEmailProvider {
  send(to: string, subject: string, body: string): Promise<void>;
}

// Token para injeção de dependência
export const EMAIL_PROVIDER_TOKEN = 'EMAIL_PROVIDER';