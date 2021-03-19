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

/// ////////////////////////INCR DECR

client.set('incr', 0);

console.time('incrTimer');
for (let i = 0; i < 10000; i++) {
  client.incr('incr');
}
console.timeEnd('incrTimer');

console.time('decrTimer');
for (let i = 0; i < 10000; i++) {
  client.decr('incr');
}
console.timeEnd('decrTimer');

client.del('incr');

/// ////////////////////////// HSET HGET
console.time('hsetTimer');
for (let i = 0; i < 10000; i++) {
  client.hset(`hKey-${i}`, `hField-${i}`, JSON.stringify({ id: i, val: `hValue-${i}` }));
}
console.timeEnd('hsetTimer');

console.time('hgetTimer');
for (let i = 0; i < 10000; i++) {
  client.hget(`hKey-${i}`, `hField-${i}`, (err, res) => {
    console.log(`i: ${i}, error: ${err}, result: ${res}`);
  });
}
console.timeEnd('hgetTimer');

console.time('hdelTimer');
for (let i = 0; i < 10000; i++) {
  client.hdel(`hKey-${i}`, `hField-${i}`);
}
console.timeEnd('hdelTimer');

client.quit();
