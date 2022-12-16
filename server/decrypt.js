import * as dotenv from 'dotenv' ;
import JSEncrypt from 'node-jsencrypt';  

export default async function decrypt (encrypted) {
   if ( encrypted == undefined || encrypted==null || encrypted == "") return "";
    const crypt = new JSEncrypt();
    try {
        crypt.setPrivateKey(process.env.PRIVATE_KEY);
        let decript = await crypt.decrypt(encrypted);
        return decript;
    } catch (error) {
        console.log(error);
        return "";
    }
    
}
