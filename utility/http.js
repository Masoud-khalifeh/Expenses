import { useContext } from 'react';
import axios from 'axios';
import * as Crypto from 'expo-crypto';


const url = "https://uiux-expert.de/api/";


async function hashPassword(password) {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
    );

    return digest;
}


/////////////////////////////////////////////////////
async function postUser(email, name, password) {
    try {
        const hashedPassword = await hashPassword(password);

        let fData = new FormData();
        fData.append('email', email);
        fData.append('name', name);
        fData.append('password', hashedPassword);

        const results = await axios.post(`${url}adduser.php`, fData).then(response => JSON.parse(response.data));
        return results
    } catch (error) {
        return error.toString();
    }

};

//////////////////////////////////////////////////////
export async function LoginUser(email, password) {
    try {

        const hashedPassword = await hashPassword(password);

        let fData = new FormData();
        fData.append('email', email);
        fData.append('password', hashedPassword);

        const results = await axios.post(`${url}login.php`, fData).then(response => response.data);
        return results;
    } catch (error) {
        return error.toString();
    }
}


///////////////////////////////////////////////////////
export async function checkEmail(email) {
    try {


        let fData = new FormData();
        fData.append('email', email);

        const result = await axios.post(`${url}checkemail.php`, fData).then(response => JSON.parse(response.data));

        return result;
    } catch (error) {
        return error.toString();
    }
}




///////////////////////////////////////////////////////
export async function getID(email) {
    try {


        let fData = new FormData();
        fData.append('email', email);

        const result = await axios.post(`${url}getid.php`, fData).then(response => JSON.parse(response.data));

        return result;
    } catch (error) {
        return error.toString();
    }
}



export default postUser;
