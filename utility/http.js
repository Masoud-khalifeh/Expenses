import axios from 'axios';

let url="http://localhost:80/sqlhandle.php"


 function postUser(email,name,password){
    
    let fData=new FormData();
    fData.append('email',email);
    fData.append('name',name);
    fData.append('password',password);


    axios.post(url,fData)
    .then(response=>alert(response.data))
    .catch(error=>alert(error))
}

export default postUser;

