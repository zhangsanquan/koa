//定义模型

const Sequelize = require('sequelize');
const sequelize = new Sequelize('custom', 'zsq', '123456',{  //建立连接
    dialect: 'mysql'  //指定数据库
});

const Custom = sequelize.define('custom', {
    id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,  //主键
        allowNull:false   //不能为空
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sex: {
        type: Sequelize.ENUM(['男','女']),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
    },
    fullAddress: {
        get() {  //定义计算属性，指定返回值
            return `${this.getDataValue('country')} ${this.getDataValue('city')} ${this.getDataValue('address')}`  //这三个其实就是这个模型里的字段值
        }
    },
    country: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING   //没写allowNull就代表可以为空
    }
});

//module.exports.Custom = Custom;
module.exports = {
    Custom
}
