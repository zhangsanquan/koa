//操作模型  （增删改查）

const { Custom } = require('./Model');
const { Op } = require('sequelize');  //Op是sequelize 类似用来操作逻辑运算符的工具Op.gt: 大于; Op.or: 或；

async function getAllCustomers() {
    return Custom.findAndCountAll({
        attributes: ['id', 'name', 'sex', 'fullAddress'],  //包含这些字段
        order: 'updatedAt Desc'  //降序
    })
}

async function getCustomerById(id) {//查找
    return Custom.findById(id)
}

async function getCustomerByName(name) {
    return Custom.findAll({
        where: {
            name: {
                [Op.like]: name  //Op.like  模糊查询， 只要带有name的那个字段的全部找到
            }
        }
    })
}

async function updateCustomer(id, params) { //更新；   params:前端传来的要更新的数据
    const item = await getCustomerById(id);
    if( item ) {
        return item.update(params)
    } else {
        throw new Error('id不存在')
    }
}

async function createCustomer(params) { //创建
    return Custom.create(params);  //params必须包含custom模型定义的那些字段才能创建
}

async function deleteCustomer(id) {  //删除
    const res = await getCustomerById(id);
    if( res ) {
        return res.destroy()
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByName,
    updateCustomer,
    createCustomer,
    deleteCustomer
}
