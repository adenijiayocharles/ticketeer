const dotenv = require("dotenv");

dotenv.config({
    path: __basedir + `/${process.env.APP_NODE_ENV}.env`,
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
};
