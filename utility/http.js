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

        const results = await axios.post(`${url}add_user.php`, fData).then(response => JSON.parse(response.data));
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

        const result = await axios.post(`${url}check_email.php`, fData).then(response => JSON.parse(response.data));

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

        const result = await axios.post(`${url}get_user_id.php`, fData).then(response => JSON.parse(response.data));

        return result;
    } catch (error) {
        return error.toString();
    }
}






///////////////////////////////////////////////////////
export async function addExpense(item) {
    try {
        let fData = new FormData();
        fData.append('userID', item.userID);
        fData.append('name', item.name);
        fData.append('date', JSON.stringify(item.date));
        fData.append('price', item.price);
        fData.append('imageURI', item.imageURI ? item.imageURI : null);
        fData.append('location', item.location ? JSON.stringify(item.location) : null);
        fData.append('address', item.address ? item.address : null);

        const result = await axios.post(`${url}add_expense.php`, fData).then(response => response.data);

        return result;
    } catch (error) {

        return error.toString();
    }
}



///////////////////////////////////////////////////////
export async function allExpenses(userID) {
    try {
        let fData = new FormData();
        fData.append('userID', userID);

        const result = await axios.post(`${url}all_expenses.php`, fData).then(response => response.data);
        return result;
    } catch (error) {
        return error.toString();
    }
}



///////////////////////////////////////////////////////
export async function getIdExpense(name, date) {
    try {
        let fData = new FormData();
        fData.append('name', name);
        fData.append('date', JSON.stringify(date));

        const result = await axios.post(`${url}get_id_expense.php`, fData).then(response => response.data);
        return result;
    } catch (error) {
        return error.toString();
    }
}



///////////////////////////////////////////////////////
export async function deleteExpense(id) {
    try {
        let fData = new FormData();
        fData.append('id', id);

        const result = await axios.post(`${url}delete_expense.php`, fData).then(response => response.data);
        return result;
    } catch (error) {
        return error.toString();
    }
}




///////////////////////////////////////////////////////
export async function updateExpense(item) {
    try {
        let fData = new FormData();
        fData.append('id', item.id);
        fData.append('userID', item.userID);
        fData.append('name', item.name);
        fData.append('date', JSON.stringify(item.date));
        fData.append('price', item.price);
        fData.append('imageURI', item.imageURI ? item.imageURI : null);
        fData.append('location', item.location ? JSON.stringify(item.location) : null);
        fData.append('address', item.address ? item.address : null);

        const result = await axios.post(`${url}update_expense.php`, fData).then(response => response.data);
        return result;
    } catch (error) {
        return error.toString();
    }
}



export default postUser;
