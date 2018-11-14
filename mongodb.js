const mongoose = require('mongoose');

//连接mongodb服务器
const db = mongoose.createConnection
("mongodb://localhost:27017/zsq",{useNewUrlParser:true});   //只到库zsq（不存在则新创建） 不能到集合

mongoose.Promise = global.Promise ;

db.on("error",console.log.bind(console,"数据库连接失败"));
db.on("open",()=>{
    console.log("数据库连接成功")
});

//设置schema（编码，用来设置数据库数据类型）
const Schema = mongoose.Schema;
const zsqSchema = new Schema({
    name:String,
    age:Number
});

//在zsq库里新创建cwp这个表，第二个是上面设置的编码格式
const useSchema = db.model("cwp",zsqSchema);// 让cwp这个表使用schema检测数据类型

//给表添加数据
const data1 = {
    name:"zzz",
    age:20,
    hope:"game"
};
const data2 = {
    name:"sss",
    age:100
};

const d1 =new useSchema(data1);  //把data1插入数据库
d1.save().then(res=>{
    console.log(res)
}).catch(error=>{
    console.log(error)
})