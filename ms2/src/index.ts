import amqp from 'amqplib';

const queue = 'userRegistrations';

const listenForMessages = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    console.log('Waiting for messages...');
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log(`Sending welcome message to: `, data);
        // Aqui você pode adicionar o envio de e-mail real.
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in message service:', error);
  }
};

listenForMessages();
