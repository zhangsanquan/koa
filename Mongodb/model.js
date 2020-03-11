const { studentSchema } = require('./schema');
let mongoose = require('mongoose');

let Student = mongoose.model('Students,', studentSchema);



module.exports = {
    Student
}