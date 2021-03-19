const redis = require('redis');

const client = redis.createClient('//redis-17770.c250.eu-central-1-1.ec2.cloud.redislabs.com:17770', { password: 'HBJnDG17i51Po6TbVWzpWbEIoFK2Wkys' });

client.on('connect', () => {
  console.log('Connected to GusiGusi/GusiRedis');
});
client.on('ready', () => {
  console.log('Ready to go');
});
client.on('error', (e) => {
  console.log(`error: ${e.message}`);
});

client.on('end', () => {
  console.log('End');
});

console.time('setTimer');
for (let i = 0; i < 10000; i++) {
  client.set(`iterKey_${i}`, `iterValue_${i}`);
}
console.timeEnd('setTimer');

console.time('getTimer');
for (let i = 0; i < 10000; i++) {
  client.get(`iterKey_${i}`);
}
console.timeEnd('getTimer');

console.time('delTimer');
for (let i = 0; i < 10000; i++) {
  client.del(`iterKey_${i}`);
}
console.timeEnd('delTimer');

client.quit();
