const redis = require('redis');

const subscriber = redis.createClient('//redis-17770.c250.eu-central-1-1.ec2.cloud.redislabs.com:17770', { password: 'HBJnDG17i51Po6TbVWzpWbEIoFK2Wkys' });
const publisher = redis.createClient('//redis-17770.c250.eu-central-1-1.ec2.cloud.redislabs.com:17770', { password: 'HBJnDG17i51Po6TbVWzpWbEIoFK2Wkys' });
let key = 0;

subscriber.on('message', (channel, message) => {
  console.log(`Sub channel: message: ${message}  on channel: '${channel}'`);
});
subscriber.on('subscribe', (channel, subsCount) => { console.log(`Subscribed to ${subsCount} channels (+${channel})`); });

subscriber.subscribe('notification');
subscriber.subscribe('notification2');

setTimeout(() => {
  subscriber.unsubscribe('notification');
  console.log('Unsubscribed from notification');
}, 10000);
setTimeout(() => {
  subscriber.quit();
  console.log('Subscriber exit');
}, 15000);

const timer = setInterval(() => publisher.publish('notification', JSON.stringify({ objKEy: key++, objValue: new Date().toTimeString() }), () => {
  console.log('Publisher: notification sent');
}), 2000);

setTimeout(() => {
  clearTimeout(timer);
  publisher.quit();
  console.log('Publisher exit');
}, 15000);
