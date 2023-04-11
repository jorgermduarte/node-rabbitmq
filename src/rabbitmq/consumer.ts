// consumer.ts
import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://guest:guest@localhost:5672';

(async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'my_queue';

    await channel.assertQueue(queue, {durable: false});
    console.log(`[Consumer] Waiting for messages in ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg) {
        const message = msg.content.toString();
        console.log(`[Consumer] Received ${message}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error(error);
  }
})();
