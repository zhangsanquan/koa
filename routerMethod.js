const fs = require('fs');

exports.home= async (ctx,next)=>{
    ctx.body='<h1>HOME</h1>'
}

exports.login = async (ctx)=>{
    ctx.body='<h1>LOGIN</h1>'
}

exports.saveImage = ctx => {
    console.log(ctx.request.body);  //get请求用ctx.request.query
    //把传过来的base64图片保存到本地
    let dataBuffer = Buffer.from(ctx.request.body.img, 'base64'); //new Buffer()已经弃用，改成Buffer.from
    fs.writeFile('D:/image.png', dataBuffer, err => {
        if(err) throw new Error('保存图片失败')
    });
    ctx.body = {
        retCode: 1
    }
}


/*
module.exports={
    home:async (ctx)=>{
        ctx.body='<h1>HOME</h1>'
    },
    login:async (ctx)=>{
        ctx.body='<h1>LOGIN</h1>'
    }
}*/
