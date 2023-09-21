require('dotenv').config();

module.exports = {
    port: process.env.SERVER_PORT,
    development: {
        username: process.env.DEVELOPMENT_DB_USER,
        password: process.env.DEVELOPMENT_DB_PASSWORD,
        database: process.env.DEVELOPMENT_DB_DATABASE,
        host: process.env.DEVELOPMENT_DB_HOST,
        dialect: 'mysql',
    },
    test: {
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        host: process.env.TEST_DB_HOST,
        dialect: process.env.DATABASE_DIALECT,
    },
    production: {
        username: process.env.PRODUCTION_DB_USER,
        password: process.env.PRODUCTION_DB_PASSWORD,
        database: process.env.PRODUCTION_DB_DATABASE,
        host: process.env.PRODUCTION_DB_HOST,
        dialect: process.env.DATABASE_DIALECT,
    },
};
