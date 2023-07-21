import axios from 'axios';

let url = "https://uiux-expert.de/api/sqlhandle.php";

async function postUser(email, name, password) {
    try {
        let fData = new FormData();
        fData.append('email', email);
        fData.append('name', name);
        fData.append('password', password);

        const response = await axios.post(url, fData);
        alert("The User Created Successfully");
        return true; 
    } catch (error) {
        return false; 
    }
}

export default postUser;
