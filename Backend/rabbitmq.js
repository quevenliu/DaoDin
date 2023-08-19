const amqp = require('amqplib');

async function connect() {
    try {
      const connection = await amqp.connect('amqp://127.0.0.1');
      const channel = await connection.createChannel();
      return channel;
    } catch (error) {
      console.error('Error:', error);
    }
}

module.exports = connect();