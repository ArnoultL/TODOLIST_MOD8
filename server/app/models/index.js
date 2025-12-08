const db = {}
db.Sequelize = Sequelize
db.connex = connex
db.products = require('./product.model.js')(connex, Sequelize)
db.users = require('./user.model.js')(connex, Sequelize)
module.exports = db