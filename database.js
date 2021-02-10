import Sequelize from 'sequelize';

const sequelize = new Sequelize('node', 'root', '0000', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;