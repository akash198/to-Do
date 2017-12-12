const models = require('../models')

const UsersHelper = require('../helpers/UsersHelper')

exports.loginUser = (req,res) =>{
    res.status(404).render('home' , {message:''} )
}

exports.loginPost = (req,res) =>{
    if(req.body.email === ''){
        res.render('home')
    }
    models.User.findOne({
        where:{
            email:req.body.email}
    }).then((user)=>{
     
        if(UsersHelper.comparePassword(req.body.password, user.dataValues.password)){
            req.session.regenerate(function(){
            req.session.id = user.dataValues.id
            req.session.user = user.dataValues
            res.writeHead(302, { location: '/user' })
            res.end()
                })
            }else {
            res.status(400).render('home', { message: 'Not valid.'})
          }
    })
}

exports.userInterface = (req,res) =>{
    models.Task.findAll({
        where:{ UserId: req.session.user.id },
        attributes: ['id', 'task'],
    }).then(tasks =>{
        console.log(tasks)
        res.render('user', {tasks})
    }) 
}


exports.userLogout = (req,res) =>{
    req.session.destroy(() => {
        res.redirect('/')
    })
}
