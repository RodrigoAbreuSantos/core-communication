import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../notification.service';

// <-- Padrão 4: OBSERVER
// Esta classe "escuta" eventos.
// Ela não sabe QUEM emitiu o evento, apenas reage a ele.
// Isso desacopla o AuthService do NotificationService.

@Injectable()
export class UserCreatedListener {
  constructor(
    // Injeta o NotificationService para poder usá-lo
    private readonly notificationService: NotificationService,
  ) {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(payload: { email: string; name: string }) {
    console.log(
      `[Observer] Evento 'user.created' recebido! Payload:`,
      payload,
    );
    
    // Chama o serviço de notificação
    await this.notificationService.sendWelcomeEmail(
      payload.email,
      payload.name,
    );
  }
}