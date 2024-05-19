import amqp from 'amqplib';

async function serviceNoti(data: any, queue: string): Promise<void> {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log('Registered successfully!');
  } catch (error) {
    console.log('Error registering');
  }
}

export { serviceNoti };
