import { Module } from '@nestjs/common';
import { Gateway } from './websocket.gateway';

@Module({
  providers: [Gateway],
  exports: [Gateway],
})
export class WebsocketModule {}
