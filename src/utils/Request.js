import axios from 'axios';
import {METHODS} from "../config/config";
import {toast} from 'react-toastify';
import cookie from 'react-cookies';



const tokenHeader = () => {
    let security_cookie = cookie.load("jwtToken");
    return security_cookie ? security_cookie : ''
};

const headerJson = {
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + tokenHeader(),
    }
};
const headerMultipart = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + tokenHeader(),
    }
};

export function ActionRequest(url, method = METHODS.GET, then, sendData) {
    let data;
    switch (method) {
        case METHODS.POST:
            data = postRequest(url, then, sendData);
            break;
        case METHODS.PUT:
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
        }
        default: {
            data = getRequest(url, then);
        }
    }
    return data;
}

/*function handleErrorResponse(response){
    if(!response.status)
        return false;
    return response.status === 'failure' || response.status === 'warning';
}*/

function getRequest(url, afterFunction) {
    return axios.get(url,headerJson).then((res) => {
        let data = res.data;
        if (afterFunction) {
            const data = (res.data._embedded) ? res.data._embedded : res.data;
            const page = (res.data.page) ? res.data.page : [];
            afterFunction({data: data, page: page});
        }
     return data;
    }).catch(handleCatch);

}

function postRequest(url, afterFunction, data) {
    console.log('enviando post request con token: ');
    console.log(headerJson);
    return axios.post(url, data, headerJson).then((res) => {
        if (afterFunction) {
            afterFunction(res.data);
        }
        return res.data;
    }).catch(handleCatch);
}

function putRequest(url, afterFunction, data) {
    return axios.put(url, data, headerJson).then((res) => {
        if (afterFunction) {
            afterFunction(res.data);
        }
    }).catch(handleCatch);
}

function deleteRequest(url, afterFunction) {
    return axios.delete(url,headerJson).then(res => {
        if (afterFunction) {
            afterFunction(res.data);
        }
    }).catch(handleCatch);
}

function uploadRequest(url, afterFunction, data) {
    return axios.post(url, data, headerMultipart).then((res) => {
        if (afterFunction) {
            afterFunction(res.data);
        }
    }).catch(handleCatch);
}

function handleCatch(error) {
    console.log('handleCatch!!!!!');
    console.log(error);
    if (error.message === "Network Error") {
        //toast.error('Network error');
    } else {

    }
}