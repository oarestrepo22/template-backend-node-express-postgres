require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/postgres`,
    {
        logging: false,
        native: false,
    }
);

const basename = path.basename(__filename);
const modelDefiners = [];

console.log(__dirname);
fs.readdirSync(path.join(__dirname, '/models'))
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

//aqui van los modelos definidos ejemplo {Instrument, Category, Admin, Cart, Payment,User}
const { User, Transactions } = sequelize.models;

Transactions.hasOne(User);
User.belongsTo(Transactions, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    hooks: true,
});

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
