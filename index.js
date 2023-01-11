import express from 'express'
import { engine } from 'express-handlebars'
import mysql from 'mysql2'
import session from 'express-session'
import flash from 'express-flash'
import sessionFileStore from 'session-file-store'
import os from 'os'
import path from 'path'
import routerUser from './routers/UserRoute.js'
import { conn } from './db/conn.js'
import routerauth from './routers/AuthRouter.js'
import cookieParser from 'cookie-parser'

//import * as url from 'url';
//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const FileStore = sessionFileStore(session)
const app = express()


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
//app.set('views', './views')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'))


app.use(
    session({
        secret: 'nossa_secret',
        name: 'session',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () { },
            path: path.join(os.tmpdir(), 'sessions')
        }),
        cookie: {
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,


        }
    })
)


//app.use(cookieParser())

app.use(flash())



app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})


app.use('/', routerauth)
app.use('/', routerUser)

conn.sync()
    .then(
        app.listen(3000)
    )
    .catch((err) => {
        console.log(err)
    })