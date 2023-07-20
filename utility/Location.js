import {Alert} from 'react-native';
import axios from "axios";

const google_API = "AIzaSyDTIEiR01Xkpb-Hqs4Ic5CqoTdTpR71s3g";


export  function getMapPreview(lat, lon) {
    const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lon}&key=${google_API}`;
    return imagePreviewURL;
}

export async function getAddress (lat,lon){
const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${google_API}` ;
const response =await axios.get(url).then(response=> response.data).catch(error=>Alert.alert(error));
const address=response.results[0].formatted_address;
return address;
}


