import { User } from '../models/User.js'
import Tought from '../models/Tought.js'
import { conn } from '../db/conn.js'



const usercontroller = class {
    static async homeview(req, res) {

        const toughtsData = await Tought.findAll({
            include: User
        })

        const toughts = toughtsData.map((result) => result.get({ plain: true }))

        res.render('home', { toughts })
    }

    static async Deshview(req, res) {

        const userid = req.session.userid

        const checkuser = await User.findOne({ where: { id: userid }, include: Tought, plain: true })


        if (!checkuser) {
            res.redirect('/login')
        }

        const toughtValues = checkuser.Toughts.map((result) => result.dataValues)


        const query = `SELECT COUNT(*) AS total_registros FROM toughts WHERE UserId = ${userid};`

        const TotalRegistrosQuery = await conn.query(query)

        const TotalRegistrosValue = TotalRegistrosQuery[0][0]["total_registros"]

        let verify = false

        if (TotalRegistrosValue === 0) {
            verify = true
        }

        res.render('deshbord', { toughtValues, verify })
    }


    static AddToughtsGet(req, res) {
        res.render('addtoughts')
    }

    static async AddToughtsPost(req, res) {

        const ToughtData = {
            tought: req.body.tought,
            UserId: req.session.userid
        }


        await Tought.create(ToughtData)

        req.flash('info', 'Pensamento adicionado com sucesso!')


        req.session.save(() => {

            res.redirect('/deshbord')
        })
    }


    static async RemoveToughts(req, res) {

        const idTought = req.body.id

        const checkTought = await Tought.findOne({ where: { id: idTought } })

        await checkTought.destroy()

        res.redirect('/deshbord')
    }

    static EditToughtsGet(req, res) {

        req.session.ToughtId = req.query.id

        req.session.save(() => {

            res.render('edit')
        })

    }

    static async EditToughtsPost(req, res) {
        const id = req.session.ToughtId

        const tought = req.body.newtought

        try {

            await Tought.update({ tought: tought }, { where: { id: id } })

            req.flash('info', 'Pensamento atualizado com sucesso!')


            req.session.save(() => {

                res.redirect('/deshbord')

            })

        } catch (err) {
            console.log("ERRO NO SISTEMA:" + err)
        }

    }
}

export default usercontroller