module.exports = ()=> {
    return async (ctx, next) =>{
        if(ctx.state.user.username === 'admin'){
            next()
        } else {
            ctx.body = {
                code: -1,
                msg: '您不是管理员'
            }
        }
    }
}