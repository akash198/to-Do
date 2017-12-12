const Promise = require('bluebird')
const models = require('../models')

const UsersHelper = require('../helpers/UsersHelper')





exports.registerUser = (req,res) =>{
    models.User.create({
        name: req.body.name,
        email: req.body.email,
        password:  UsersHelper.hashPassword(req.body.password)
    }).then(()=>{
        res.redirect('/')
    })
}



exports.addTodo = (req,res) =>{
    if(req.body.task === ''){
        res.redirect('/user')
        return
    }
    models.Task.create({
        task: req.body.task,
        UserId: req.session.user.id
    }).then( ()=>{
    
        res.redirect('/user')
    })
}



exports.notFound = (req,res) =>{
    res.send('404 PageNot Found')
}



exports.deleteItem = (req,res) =>{
    models.Task.destroy({
        where:{ id :req.params.id, UserId: req.session.user.id}
    }).then(() =>{
        res.redirect('/user')
    } )
}