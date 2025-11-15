import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global() // Torna o ConfigService disponível globalmente
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}