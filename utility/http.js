import axios from 'axios';
import * as Crypto from 'expo-crypto'; 

let url = "https://uiux-expert.de/api/sqlhandle.php";

async function hashPassword(password) {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  return digest;
}

async function postUser(email, name, password) {
  try {
    
    const hashedPassword = await hashPassword(password);

    let fData = new FormData();
    fData.append('email', email);
    fData.append('name', name);
    fData.append('password', hashedPassword); 

    const response = await axios.post(url, fData);
    alert("The User Created Successfully");
    return true;
  } catch (error) {
    return false;
  }
}

export default postUser;
