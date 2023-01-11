import { DataTypes } from "sequelize";
import {conn} from '../db/conn.js'


const User = conn.define('User', {
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        required : true
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false,
        required : true
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false,
        required : true
    }
})


export {User}