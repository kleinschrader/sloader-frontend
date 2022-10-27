async function checkLoginState() {
    const url = window.api_server + '/loginState';
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json'
        }
    })
}


export default checkLoginState;