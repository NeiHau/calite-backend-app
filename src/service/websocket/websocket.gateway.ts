import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', socket => {
      console.log(socket.id);
      console.log('connected!');
    });
  }

  @SubscribeMessage('newMessage')
  broadcastMessage(message: any) {
    this.server.emit('onMessage', message);
  }
}
