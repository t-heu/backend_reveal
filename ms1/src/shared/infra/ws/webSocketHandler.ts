import socket from 'socket.io';
import { Server } from 'http';

class WebSocketHandler {
  private io: socket.Server;

  private connectUsers: { [key: string]: string } = {};

  initialize(server: Server): void {
    this.io = socket(server);
    // console.log('ws: ', this.io.on);

    this.io.on('connection', (socket: any) => {
      const { user } = socket.handshake.query;
      this.connectUsers[user] = socket.id;
      console.log(`User connected: ${user}, Socket ID: ${socket.id}`);

      socket.on('disconnect', () => {
        delete this.connectUsers[user];
        console.log(`User disconnected: ${user}`);
      });

      socket.on('count_notification_not_read', (data: any) => {
        if (data.clear) {
          console.log(data, ' --- ');
          // Chamado ao ClearNotificationController se necessário
        }
      });
    });
  }

  sendNotification(userID: string, message: any): void {
    const socketId = this.connectUsers[userID];
    if (socketId) {
      this.io.to(socketId).emit('count_notification_not_read', message);
    }
  }
}

export { WebSocketHandler };
