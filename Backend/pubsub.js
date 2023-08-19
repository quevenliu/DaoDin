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
   
    console.log(messageList);
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
/*
async function main() {
  const channel = await connect();

  const group1Exchange = await createGroupExchange(channel, 1);
  const group2Exchange = await createGroupExchange(channel,2);

  const user1Queue = await createUserQueue(channel,1);
  const user2Queue = await createUserQueue(channel,2);
  
  await bindUserQueueToExchange(channel,"user_1_queue", "group_1_exchange");
  await bindUserQueueToExchange(channel,"user_2_queue", "group_1_exchange");
  await bindUserQueueToExchange(channel,"user_2_queue", "group_2_exchange");

  const notification1 = {
    message: 'New task available for group1!',
  };
  await sendNotificationToExchange(channel,"group_1_exchange",  { group_id: 4 });

  await unbindUserQueueFromExchange(channel,"user_2_queue", "group_2_exchange");
  const notification2 = {
    message: 'New task available for group2!',
  };
  await sendNotificationToExchange(channel,"group_2_exchange", { group_id: 4 });
  await consumeMessagesFromQueue(channel,"user_1_queue");
  await consumeMessagesFromQueue(channel,"user_2_queue");
}

main();
*/
module.exports = {
  connect,
  createGroupExchange,
  bindUserQueueToExchange,
  createUserQueue,
  sendNotificationToExchange,
  consumeMessagesFromQueue,
  unbindUserQueueFromExchange,
};