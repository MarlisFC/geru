import axios from 'axios';
import {METHODS} from "../config/config";
import {toast} from 'react-toastify';


export function ActionRequest(url, method = METHODS.GET, then, sendData) {
    let data;
    switch (method) {
        case METHODS.POST:
            data = postRequest(url, then, sendData);
            break;
        /*case METHODS.PUT:
            data = putRequest(url, then, sendData);
            break;
        case METHODS.DELETE:
            data = deleteRequest(url, then);
            break;
        case METHODS.GET:
            data = getRequest(url, then);
            break;
        case METHODS.UPLOAD: {
            data = uploadRequest(url, then, sendData);
            break;
        }*/
        default: {
            /*data = getRequest(url, then);*/
        }
    }
    return data;
}



function postRequest(url, afterFunction, data) {
    console.log('enviando post request: ');
    //console.log(headerJson);

    return axios.post(url, data).then((res) => {
        if (afterFunction) {
            afterFunction(res.data);
        }
        return res.data;
    }).catch(handleCatch);
}



function handleCatch(error) {
    console.log('handleCatch!!!!!');
    console.log(error);
    if (error.message === "Network Error") {
        toast.error('Network error');
    } else {
        toast.error('Error');
    }
}