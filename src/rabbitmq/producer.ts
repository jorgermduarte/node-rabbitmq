// producer.ts
import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://guest:guest@localhost:5672';

(async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'my_queue';

    await channel.assertQueue(queue, {durable: false});

    const message = 'Hello, RabbitMQ!';
    // eslint-disable-next-line no-undef
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`[Producer] Sent ${message}`);

    setTimeout(() => {
      connection.close();
      // eslint-disable-next-line no-undef
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
})();
