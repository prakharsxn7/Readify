require('dotenv').config();

module.exports = {
    DB_CONNECTION: process.env.DB_CONNECTION,
    PORT: process.env.PORT || 3000
};