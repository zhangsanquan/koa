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
    age:{
        type:String,
        index:true  //索引
    },
    hope:String
});

//zsqSchema.index({"age":1}); 另一种索引方式

//  zsqSchema.set('collection','cwp');   加了这句底下生成的表就不会加 s 
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
    age:100,
    hope:'eat'
};

/*const d1 =new useSchema(data1);  //把data1插入数据库
d1.save().then(res=>{
    console.log(res)
}).catch(error=>{
    console.log(error)
});*/

/*useSchema.insertMany([
    {
        name:'zsq1',
        age:'18',
        hope:'much1'
    },
    {
        name:'zsq2',
        age:'20',
        hope:'much2'
    },
    {
        name:'zsq3',
        age:'22',
        hope:'much3'
    },
    {
        name:'zsq4',
        age:'30',
        hope:'much4'
    },
]);*/


async function groupData(){ //数据库操作时异步IO  必须这样写才能取到data3
    const data3 =await useSchema.aggregate([{$group:{_id:"$name",num:{$sum:1}}}]);
    console.log(data3);

    const data4 = await useSchema.aggregate([{
        $group:{_id:"$name",maxAge:{$max:"$age"},minAge:{$avg:"$age"}}
    }]);
    console.log(data4);

    const data5 = await useSchema.aggregate([{
        $group:{_id:"$name",numberOne:{$first:"$age"}}
    }]);
    console.log(data5);

    const data6 = await useSchema.aggregate([{
        $project:{
            _id:0,
            name:1
        }
    }]);
    console.log(data6);

    const data7 = await useSchema.aggregate([{
        $sort:{
            age:1     //1：升序   -1：降序
        }
    }]);
    console.log(data7);

    const data8 = await useSchema.aggregate([
        {$match:{
               // name:"zzz"   //过滤筛选出name zzz的 集合文档{}
                age:{$gt:18, $lt:30}
            }},
        { $group: {
                _id:null,count:{ $sum: 1}  //group操作必须有个_id,所以给其置null。
            }}
    ]);
    console.log(data8);

    const data9 = await useSchema.aggregate([
            { $project:{
                _id:0,
                age:1
            }},
            { $limit: 3 }
        ]);
    console.log(data9);

    const data10 = await useSchema.aggregate([{
        $unwind: "$hope"   //将hope字段的数组转化为对象
    }]);
    console.log(data10);

}

groupData()
