const Promise = require('bluebird')
const models = require('../models')

const UsersHelper = require('../helpers/UsersHelper')



exports.loginUser = (req,res) =>{
    res.render('home')
}

exports.registerUser = (req,res) =>{
    models.User.create({
        name: req.body.name,
        email: req.body.email,
        password:  UsersHelper.hashPassword(req.body.password)
    }).then(()=>{
        res.redirect('/')
    })
}


exports.loginPost = (req,res) =>{
    models.User.findOne({
        where:{
            email:req.body.email,
            password:req.body.password
        }
    }).then(()=>{
        res.render('user')
    })
}


exports.userLogout = (req,res) =>{
    req.session.destroy(() => {
        res.redirect('/')
    })
}