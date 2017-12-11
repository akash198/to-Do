const crypto = require('crypto')
const bcrypt = require('bcrypt')

exports.hashPassword = (password) => {
  // Hash using bcrypt
  console.log(password)
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

exports.comparePassword = (password, hash) => bcrypt.compareSync(password, hash)
