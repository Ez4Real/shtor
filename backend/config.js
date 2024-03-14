require('dotenv').config()

module.exports = {
    // APP Conf
    PORT: process.env.PORT,
    HOSTNAME: process.env.SHTOR_HOST,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,

    // DATABASE Conf
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_CLUSTER: process.env.DB_CLUSTER,

    // JWT Conf
    SECRET_KEY: process.env.JWT_SECRET,

    // EMAIL Conf
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
}