import amqp from 'amqplib';

class RabbitMQHandler {
  private channel: amqp.Channel;

  async connect(): Promise<void> {
    const connection = await amqp.connect('amqp://localhost');
    this.channel = await connection.createChannel();
  }

  async publishToQueue(queue: string, data: any): Promise<void> {
    await this.connect();
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  }
}

export { RabbitMQHandler };
