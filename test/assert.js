/*
* Assert 是一种TDD（测试驱动开发）风格的断言
*
* */

const { assert } = require('chai');
const a = "hello";
const b = { tea: ['chai', 'matcha', 'oolong'] };

assert.typeOf(a, 'string');  //判断类型，正常情况不会有任何提示
assert.typeOf(a, 'number');  //异常时会报错提示
assert.equal(a, 'hello');    //判断a等于 hello
assert.lengthOf(a, 5);       //判断长度
assert.lengthOf(b.tea, 3);



//assert.hasAnyKeys()  判断实际值是否存在
//assert.hasAllKeys()  判断实际值是否完全相同
//assert.isOk()        判断当前值是否为真



