import { Sequelize } from "sequelize";

const conn = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})



export { conn }