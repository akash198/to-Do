const models = require('../models')

exports.verify = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'user') {
    res.redirect('/')
    return
  }
}


