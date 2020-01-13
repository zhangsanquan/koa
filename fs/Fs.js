const fs = require('fs');

/*
    fs.mkdir('./index', err => {
        if(err) throw err
    });
*/

//fs所有的异步都是去掉Sync就好了
//fs.mkdirSync('./fs/index');   //同步创建文件夹

//fs.renameSync('./fs/admin', './fs/index');  //重命名文件夹

//fs.unlinkSync('./fs/index/test.txt')  //删除文件

fs.rmdirSync('./fs/index')    //删除文件夹
