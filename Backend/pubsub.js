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
async function createGroupExchange(channel, groupName) {
  try {
    const exchangeName = `group_${groupName}_exchange`;

    await channel.assertExchange(exchangeName, 'fanout', { durable: true });

    return exchangeName;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function createUserQueue(channel,username) {
  try {
    const queueName = `user_${username}_queue`;

    await channel.assertQueue(queueName, { durable: true });

    return queueName;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function bindUserQueueToExchange(channel,queueName, exchangeName) {
  try {
    await channel.bindQueue(queueName, exchangeName, '');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendNotificationToExchange(channel,exchangeName, message) {
  try {
    await channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
    console.log(`Notification sent to exchange ${exchangeName}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function consumeMessagesFromQueue(channel,queueName) {
  try {
    await channel.assertQueue(queueName, { durable: true });

    console.log(`Waiting for messages in queue ${queueName}. To exit press CTRL+C`);
    let messageList = [];
    await channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message from queue ${queueName}:`, message);
        messageList.push(message["group_id"]);
     
        channel.ack(msg);
        
      }
    });
   
    return messageList;
 
    
  } catch (error) {
    console.error('Error:', error);
  }
}
async function unbindUserQueueFromExchange(channel, queueName, exchangeName) {
  try {
    await channel.unbindQueue(queueName, exchangeName, '');
    console.log(`Unbound queue ${queueName} from exchange ${exchangeName}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  connect,
  createGroupExchange,
  bindUserQueueToExchange,
  createUserQueue,
  sendNotificationToExchange,
  consumeMessagesFromQueue,
  unbindUserQueueFromExchange,
};