const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');  // 端口号， IP

client.on('error', err => {
    console.log(err)
});
// client.quit()   退出连接

//get set设置key value 字符串类型
client.get('name', (err, value) => {  //可以在命令行设置，在这里获取， 也可以在这理设置
    if(err) throw err;
    console.log('Name:' , value)
});

client.set('age', 26, redis.print);  //redis.print 会显示本次设置的结果，成功就显示 Reply: OK


//Hash  obj= { key1: value1, key2:value2}
client.hmset('student2', {
    name: 'cwp',
    color: 'yellow'
});

//注意重复设置student 类型  ，比如上面hset设置过student,那么这里hmset就不能再设置student, 会报类型错误
//client.hmset('student', 'name', 'cwp', 'color', 'yellow')  也可以这样设置hash
client.hgetall('student2', (err, data) => {
    if(err) throw err;
    console.log(data)  // { name:'cwp',  color: 'yellow'}
});

client.hkeys('student2', (err, keys) => {
    console.log(keys); // ['name', 'color']
    keys.forEach((item, index) => {
        console.log(item, index)
    })
});


//List 列表 类似数组，但是List性能较差，长度变成速度会变慢很多
client.lpush('arr', 'a', redis.print);
client.lpush('arr', 'b', redis.print);
client.lpush('arr', 'c', redis.print);
client.lrange('arr', 0, 2, (err, data) => {
    console.log(data)  //['c', 'b', 'a']  可以看到lpush类似shift，是往前插入（左边插入）
})


//Set: 无序集合， 不能有重复数据
client.sadd('color', 'red', redis.print);   //Reply: 1
client.sadd('color', 'blue', redis.print);  //Reply: 1
client.sadd('color', 'blue', redis.print);  //重复的会插入失败  Reply: 0
client.smembers('color', (err, data) => {
    console.log(data) // [''red', 'blue']   可以看出sadd是从后插入，与数组push一样
});



