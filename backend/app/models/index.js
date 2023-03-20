const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.order = require("./order.model.js")(sequelize, Sequelize);
db.dish = require("./dish.model.js")(sequelize, Sequelize);
db.detail = require("./detail.model.js")(sequelize, Sequelize);

db.order.hasMany(db.detail, { as: "detail" });
db.detail.belongsTo(db.order, {
    foreignKey: "orderId",
    as: "order",
});

db.dish.hasMany(db.detail, { as: "detail" });
db.detail.belongsTo(db.dish, {
    foreignKey: "dishId",
    as: "dish",
});


module.exports = db;