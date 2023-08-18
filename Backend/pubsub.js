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

async function createUserQueue(channel, username) {
  try {
    const queueName = `user_${username}_queue`;
    
    await channel.assertQueue(queueName, { durable: true });
    
    return queueName;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function bindUserQueueToExchange(channel, queueName, exchangeName) {
  try {
    await channel.bindQueue(queueName, exchangeName, '');
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendNotificationToExchange(channel, exchangeName, message) {
  try {
    await channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
    console.log(`Notification sent to exchange ${exchangeName}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// async function main() {
//   const channel = await connect();

//   // 假設有兩個團體：group1 和 group2
//   const group1Exchange = await createGroupExchange(channel, 'group1');
//   const group2Exchange = await createGroupExchange(channel, 'group2');

//   // 假設使用者 user1 登入並加入 group1，建立其專屬隊列並綁定到對應的交換機
//   const user1Queue = await createUserQueue(channel, 'user1');
//   await bindUserQueueToExchange(channel, user1Queue, group1Exchange);

//   // 假設有通知需要發送到 group1
//   const notification1 = {
//     group: 'group1',
//     message: 'New task available for group1!',
//   };
//   await sendNotificationToExchange(channel, group1Exchange, notification1);

//   // 假設使用者 user2 登入並加入 group2，建立其專屬隊列並綁定到對應的交換機
//   const user2Queue = await createUserQueue(channel, 'user2');
//   await bindUserQueueToExchange(channel, user2Queue, group2Exchange);

//   // 假設有通知需要發送到 group2
//   const notification2 = {
//     group: 'group2',
//     message: 'New task available for group2!',
//   };
//   await sendNotificationToExchange(channel, group2Exchange, notification2);

//   // 其他操作...
// }

// main();
module.exports = {
    connect,
    createGroupExchange,
    bindUserQueueToExchange,
    createUserQueue,
    sendNotificationToExchange

};