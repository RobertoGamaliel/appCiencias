import { generateKeyPair } from 'crypto';
import * as dotenv from 'dotenv' 
dotenv.config();
 export default generateKeyPair('rsa', {
    modulusLength: 4096,    // key size in bits
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {   
        type: 'pkcs8',      
        format: 'pem',
    },
}, (err, publicKey, privateKey) => {
    console.log(publicKey);
    console.log(privateKey);
    // Handle errors and use the generated key pair.
});