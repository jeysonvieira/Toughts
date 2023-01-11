import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'
import { where } from 'sequelize'



const AuthController = class {
    static signupGet(req, res) {
        res.render('signup')
    }


    static async signupPost(req, res) {

        const { name, email, password, confpassword } = req.body


        if (password != confpassword) {

            req.flash('info', 'Senha errada, tente novamente')

            res.render('signup')

            return

        }

        const checkemail = await User.findOne({ where: { email: email } })

        if (checkemail) {

            req.flash('info', 'Esse email já possui cadastro no sistema!')

            res.render('signup')

            return

        }



        const Salt = bcrypt.genSaltSync(10)

        const hashedpassword = bcrypt.hashSync(password, Salt)

        const user = {
            name,
            email,
            password: hashedpassword
        }


        try {
            const Createuser = await User.create(user)

            req.session.userid = Createuser.id

            req.session.save(() => {
                res.redirect('/')
            })


        } catch (err) {
            console.log(err)
        }


    }


    static loginGet(req, res) {
        res.render('login')
    }


    static async loginPost(req, res) {

        const { email, password } = req.body

        const UserCheckEmail = await User.findOne({ where: { email: email } })


        if (!UserCheckEmail) {
            req.flash('info', 'Email inválido, tente novamente.')



            req.session.save(() => {
                res.redirect('/login')
            })

            return
        }

        const passwordDesc = bcrypt.compareSync(password, UserCheckEmail.password)


        if (!passwordDesc) {
            req.flash('info', 'Senha incorreta, tente novamente.')

            req.session.save(() => {
                res.redirect('/login')
            })

            return
        }


        req.session.userid = UserCheckEmail.id


        req.flash('info', 'login concluido com sucesso')

        req.session.save(() => {
            res.redirect('/')
        })


    }

    static logout(req, res) {

        req.session.destroy()
        res.redirect('/login')
    }
}



export { AuthController }