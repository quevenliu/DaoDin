const amqp = require('amqplib');
const pool = require('./Model/db').pool;

let channel; 

async function connect() {
  try {
    const connection = await amqp.connect('amqp://127.0.0.1');
    channel = await connection.createChannel();

  } catch (error) {
    console.error('Error:', error);
  }
}

async function createGroupExchange(groupName) {
  try {
    const exchangeName = `group_${groupName}_exchange`;

    await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    return exchangeName;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createUserQueue(username) {
  try {
    const queueName = `user_${username}_queue`;

    await channel.assertQueue(queueName, { durable: true });

    return queueName;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function bindUserQueueToExchange(queueName, exchangeName) {
  try {
    await channel.bindQueue(queueName, exchangeName, '');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendNotificationToExchange(exchangeName, message) {
  try {
    await channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
    console.log(`Notification sent to exchange ${exchangeName}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function consumeMessagesFromQueue(queueName) {
  try {
    await channel.assertQueue(queueName, { durable: true });

    console.log(`Waiting for messages in queue ${queueName}. To exit press CTRL+C`);
    const messageList = [];
    channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message from queue ${queueName}:`, message);
        messageList.push(message);
        channel.ack(msg);
      }
    });
    return messageList;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main() {
  await connect();

  const group1Exchange = await createGroupExchange(1);
  const group2Exchange = await createGroupExchange(2);

  const user1Queue = await createUserQueue(1);
  const user2Queue = await createUserQueue(2);
  
  await bindUserQueueToExchange("user_1_queue", "group_1_exchange");
  await bindUserQueueToExchange("user_2_queue", "group_1_exchange");

  const notification1 = {
    message: 'New task available for group1!',
  };
  await sendNotificationToExchange("group_1_exchange", notification1);

  const notification2 = {
    message: 'New task available for group2!',
  };
  await sendNotificationToExchange("group_2_exchange", notification2);

  await consumeMessagesFromQueue("user_1_queue");
  await consumeMessagesFromQueue("user_2_queue");
}

main();

module.exports = {
  connect,
  createGroupExchange,
  bindUserQueueToExchange,
  createUserQueue,
  sendNotificationToExchange,
  consumeMessagesFromQueue,
};
