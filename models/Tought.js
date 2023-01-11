import { DataTypes } from "sequelize";
import {conn} from '../db/conn.js'
import { User } from "./User.js";


const Tought = conn.define('Tought', {
    tought: {
        type : DataTypes.STRING
    }
})


Tought.belongsTo(User)
User.hasMany(Tought)


export default Tought