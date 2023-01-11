import express from 'express'
import usercontroller from '../controllers/UserController.js'
import AuthConf from '../helpers/Auth.js'

const routerUser = express.Router()



routerUser.get('/', usercontroller.homeview)

routerUser.get('/deshbord', AuthConf, usercontroller.Deshview)

routerUser.get('/addtoughts', AuthConf, usercontroller.AddToughtsGet)

routerUser.post('/addtoughts', AuthConf, usercontroller.AddToughtsPost)

routerUser.post('/toughts/remove', AuthConf, usercontroller.RemoveToughts)

routerUser.get('/toughtsEdit', AuthConf, usercontroller.EditToughtsGet)

routerUser.post('/toughts/edit', AuthConf, usercontroller.EditToughtsPost)

export default routerUser