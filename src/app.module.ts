import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    // <-- Padrão 4: OBSERVER (Setup)
    EventEmitterModule.forRoot(),
    
    // <-- Padrão 1: SINGLETON (Setup)
    ConfigModule,
    
    // Módulo principal com os Padrões 2, 3 e 4 (Listener)
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}