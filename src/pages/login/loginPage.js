import { useState } from 'react';

import { useDispatch } from 'react-redux';
import {setto} from './../../features/globalState/globalStateSlice';


function ErrorDisplay(props) {
    if (props.message) {
        return (
            <span id="ErrorDisplay">{props.message}</span>
        )
    }
};

function LoginPage() {
    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");

    let handeLogin = e => {
        e.preventDefault();

        let requestBody = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }
    
        fetch(window.api_server + '/login', {
            method: "POST",
            body: JSON.stringify(requestBody),
            credentials: "include",
        }).then(r => {
            return r.json();
        }).then(r => {
            if (r.success) {
                window.localStorage.setItem('userid',r.userdata.userid)
                window.localStorage.setItem('name',r.userdata.name)
                window.localStorage.setItem('admin',r.userdata.admin)
                dispatch(setto("dashboard"))
            }
            else {
                setErrorMessage("Invalid credentials, try again")
            }
        })
    }

    return (
        <div className="LoginPage App">
            <form onSubmit={handeLogin}>
                <h2>sLoader Login</h2>
                <label htmlFor="username">USERNAME</label>
                <input id="username" name="username"/>
                <label htmlFor="password">PASSWORD</label>
                <input id="password"name="password" type="password"/>
                <ErrorDisplay message={errorMessage}/>
                <input type="submit" value="LOGIN"/>
            </form>
        </div>
    )
}

export default LoginPage;