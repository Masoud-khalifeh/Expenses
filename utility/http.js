import { useContext } from 'react';
import axios from 'axios';
import * as Crypto from 'expo-crypto';

let urlAddUser = "https://uiux-expert.de/api/adduser.php";
const urlLogin = "https://uiux-expert.de/api/login.php";
const urlCheckEmail = "https://uiux-expert.de/api/checkemail.php";


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

        const results = await axios.post(urlAddUser, fData).then(response => JSON.parse(response.data));
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

        const result = await axios.post(urlLogin, fData).then(response => response.data);
        alert(result);
        console.log(result);
        return true;
    } catch (error) {
        alert(error);
        console.log(error);
        return false;
    }
}


///////////////////////////////////////////////////////
export async function checkEmail(email) {
    try {


        let fData = new FormData();
        fData.append('email', email);

        const result = await axios.post(urlCheckEmail, fData).then(response => JSON.parse(response.data));

        return result;
    } catch (error) {
        return error.toString();
    }
}



export default postUser;
