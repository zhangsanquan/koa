const mongoose = require('mongoose');


async function connect() {  //封装连接方法
    await mongoose.connect('mongodb://192.168.10.18/test', { //连接test数据库
        user: 'username', //数据库用户名
        pass: 'password', //数据库密码
        poolSize: 10    //连接池
    });

    const db = mongoose.connection;  //获取连接对象
    db.on('error', err => {
        console.log(err)
    });

    db.on('open', () => {
        console.log('mongodb连接成功')
    });
}

async function close() {  //封装关闭连接方法
    await mongoose.connection.close()
}

module.exports = {
    dbConnect: connect,
    dbClose: close
}