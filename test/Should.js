/*
* should 与 expect 一样属于链式断言， 但是它会给每个对象添加一个Should属性
* */

const should = require('chai').should();  //should引入时就需要执行函数， 这是与expect的重要区别，目的是为了拓展
const num = 10;

const b =  { tea: ["chai", 'matcha', 'oolong']};

num.should.be.a('number');  // a/an用来判断类型
num.should.equal(10);
//num.should.have.lengthOf(3)
b.should.have.property('tea').with.lengthOf(3);

b.should.deep.equal({ tea: ["chai", 'matcha']});   // deep: 深度判断两个对象

