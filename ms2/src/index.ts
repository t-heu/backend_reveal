import dotenv from 'dotenv';
import amqp from 'amqplib';

import {sendEmailVerify} from './services/sendEmailVerify';
import {sendEmailForgotPassword} from './services/sendEmailForgotPassword';

dotenv.config();

const queue1 = 'sendEmailRegistrations';
const queue2 = 'notificationRegistrations';

const listenForMessages = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    await channel.assertQueue(queue1);
    await channel.assertQueue(queue2);

    console.log('Waiting for messages...');

    // Consumer for queue1
    channel.consume(queue1, (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log(`Processing user registration: `, data);

        if (data.type === 'verified_email') {
          sendEmailVerify(data);
        }

        if (data.type === 'forgot_password') {
          sendEmailForgotPassword(data);
        }
        // Aqui você pode adicionar o processamento de registro de usuário real.
        channel.ack(msg);
      }
    });

    // Consumer for queue2
    channel.consume(queue2, (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log(`Processing notification registration: `, data);
        
        // Aqui você pode adicionar o processamento de registro de notificação real.
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in message service:', error);
  }
};

listenForMessages();
