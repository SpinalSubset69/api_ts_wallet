import { createPool } from 'mysql2/promise'; //para hacer uso de async/await
import dotenv from 'dotenv';

//Config of ENV variables
dotenv.config({
    path: `${__dirname}/../../..//config/${process.env.NODE_ENV}.env`
})

//Exportamos la conexion
export default createPool({
    host: process.env.db_mysql_host,
    user: process.env.db_mysql_user,
    password: process.env.db_mysql_password,
    database: process.env.db_mysql_database,
    decimalNumbers: true
});
