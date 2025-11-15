import { Controller, Get } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class AppController {
  constructor(
    // <-- Padrão 4: OBSERVER (O Emissor / Subject)
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get('test-event')
  testEvent() {
    console.log("[AppController] Emitindo evento 'user.created'...");
    
    // Emite o evento que o UserCreatedListener (Observer) está ouvindo
    this.eventEmitter.emit('user.created', {
      email: 'aluno@universidade.com',
      name: 'Aluno de Padrões',
    });

    return { message: "Evento 'user.created' emitido!" };
  }
}