import {createPool} from 'mysql2/promise';
import { rootCertificates } from 'tls';

export const pool = createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:"Motoride",
    database: 'uabc_db'
});
