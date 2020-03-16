/*
* Expect 是一种BDD（行为驱动开发）风格的断言
*/

const { expect } = require('chai');
const str = "hello";
const b = { tea: ['chai', 'matcha', 'oolong']};

expect(str).to.be.a('string');    //判断类型  同样的正常情况没有任何提示
expect(str).to.be.a('number');  //判断错误时，报错提示
expect(str).to.equal(b);          //to.be.equal() 好像也行  不知有啥区别
expect(4+8).to.equal(12);       // to.be.not.equal(13)   不等于

expect([1,2,3]).to.lengthOf(3);
expect(b).to.property('tea').with.lengthOf(3);

expect(10).to.above(11);              //判断 10 是否大于 11
expect(str).to.match(/[a-zA-Z]/);    //match: 匹配正则
expect(str).to.include('e');         // include/contains  判断是否包含某个内容

