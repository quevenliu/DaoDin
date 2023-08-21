const amqp = require('amqplib');

async function connect() {
    try {
      const connection = await amqp.connect('amqp://rabbitmq:5672');
      const channel = await connection.createChannel();
      return channel;
    } catch (error) {
      console.error('Error:', error);
    }
}

module.exports = connect();
