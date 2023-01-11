const AuthConf = function(req, res, next){
    if(!req.session.userid){
        res.redirect('/')
    }


    next()
}



export default AuthConf