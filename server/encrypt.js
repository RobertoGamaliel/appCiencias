import * as dotenv from 'dotenv' ;
import JSEncrypt from 'node-jsencrypt';  

export default  async function encrypt(text) {
    if ( text==undefined || text==null || text == "") return "";
    const crypt = new JSEncrypt();
    console.log(dotenv.PUBLIC_KEY)
    try {
        crypt.setKey(process.env.PUBLIC_KEY);
        let encode = await crypt.encrypt(text);
        return encode;
    } catch (error) {
       console.log(error);
       return "";
    }
}
