import {API_SERVER} from './config'

async function checkLoginState() {
    const url = API_SERVER + '/loginState';
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })
}


export default checkLoginState;