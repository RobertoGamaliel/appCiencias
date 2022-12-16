import {createPool} from 'mysql2/promise';
import { rootCertificates } from 'tls';

export const pool = createPool({
    host:'us-cdbr-east-06.cleardb.net',
   // port:3306,
    user:'be6ff1ebea99f4',
    password:"b746c980",
    database: 'heroku_3078fbdeb80e0ea'
});
