exports.home= async (ctx,next)=>{
    ctx.body='<h1>HOME</h1>'
}

exports.login = async (ctx)=>{
    ctx.body='<h1>LOGIN</h1>'
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
