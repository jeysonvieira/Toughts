import { AuthController } from "../controllers/AuthController.js";
import express from 'express'

const routerauth = express.Router()



routerauth.get('/signup', AuthController.signupGet)
routerauth.post('/signup/post', AuthController.signupPost)


routerauth.get('/login', AuthController.loginGet)
routerauth.post('/login/post', AuthController.loginPost)


routerauth.get('/logout', AuthController.logout)



export default routerauth



