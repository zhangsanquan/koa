
const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList } = require('graphql');


const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let userInfoSchema = new mongoose.Schema({
    name: String,
    id: {
        type: ObjectId,
        unique: true,
        index: true  //索引
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    age: Number,
    image: Buffer
});

const User = mongoose.model('users', userInfoSchema);



//1. 配置用户schema
const UserSchema = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        image: {
            type: GraphQLString
        },

    }
});


//批量查询
const userInfos = {
    type: new GraphQLList(UserSchema),
    args: {},
    async resolve(){
        return await User.find({}).save()
    }
};



//根据ID查询
const userInfo = {
    type: new GraphQLList(UserSchema),
    args: {
        id: {
            name:'id',
            type: GraphQLID
        }
    },
    async resolve(root, params, options){
        return await User.findOne({_id: params.id}).exec()
    }
};




//2. 定义一个根。 配置调用Schema的的方法
// const RootSchema = new GraphQLObjectType({
//     name: 'root',
//     fields: {
//         userList: {  //用户列表
//             type: GraphQLList(UserSchema),
//             async resolver(parent, args){
//                 console.log(parent);  //指向userList
//                 //return await DB.find('user', {})   //find: 查询数据的根
//                 return [{_id: "123", age: 18}]   //find: 查询数据的根
//             }
//         }
//     }
// });




//3. 把查询的根挂载到Graph
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Queries',
        fields: {
            userInfo,
            userInfos
        }
    })
})

