const { Student } = require('./model');


function createStudent(params) { //创建
    new Student(params).save(error => { //新增一个学生对象
        if(error){
            console.log(error);
            return
        }
        ctx.body = {
            status: 1
        }
    })
    // await Student.insertMany(params)  同时新增多个学生数据时
}


// async function getAllStudents() {
//     return await Student.find().sort({
//         id: 1  //根据学号升序 1号~2号~3号 ……
//     })
// }

function getAllStudents() {
    Student.find()
        .then(res => {
            ctx.body = {
                data: res
            }
        })
        .catch(err => {
            console.log(err)
        })
}

function getStudentByName(params) {
    Student.find({ name: params.name }, (err, data) => {
        if(err) console.log(error);
        ctx.body = {
            status: 1,
            data
        }
    });

    //也可以写成Promise形式
    Student.find({ name: /^章/})
        .then(res => {
            ctx.body = {
                data: res
            }
        })
        .catch(err => {
            console.log(err)
        })
}

function sortStudent(){
    Student.where('age')
        .lt(20)
        .select('name', 'image')  //指定输出字段
        .sort({age: 1})  //1： 升序；  -1： 降序
        .limit(10)
        .exec((err, data) => { //exec: 执行查询
            if(err) console.log(error);
            ctx.body = {
                status: 1,
                data
            }
        })
 }


function getStudentById(id) {
    Student.findById(id)
        .then(res => {
            ctx.body = {
                data: res
            }
        })
        .catch(err => {
            console.log(err)
        })
}


function updateStudent(id, params){
    Student.update({ _id: id }, params, err => {
        if (err) return console.log(err);
    })
}

function removeStudent(id){
    Student.remove({_id: id})
}



module.exports = {
    createStudent,
    getAllStudents,
    getStudentByName,
    sortStudent,
    getStudentById,
    updateStudent,
    removeStudent
}
