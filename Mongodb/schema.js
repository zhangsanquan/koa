const mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({  //学生
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
    image: Buffer  //二进制数据
});


let courseSchema = new mongoose.Schema({  //课程
    name: String,
    hour: {  //时
        type: Number,
        max: 18,  //课程最晚6点上课
        min: 8    //最早8点上课
    },
    minute: { //分
        type: Number,
        max: 59,
        min: 0
    },
    time: {
        type: Number,
        get(){
            return this.get('hour') + ':' + this.get('minute')   // 如  10:30
        }
    }
});

module.exports = {
    studentSchema,
    courseSchema,
};


