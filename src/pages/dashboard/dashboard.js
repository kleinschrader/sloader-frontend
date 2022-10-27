import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {setto} from './../../features/globalState/globalStateSlice';
import {ma_setto, selectMainArea} from './../../features/mainAreaState/mainAreaSlice.js';

import {API_SERVER} from './../../config'

//mainareas
import Home from './mainareas/home';
import AddTarget from './mainareas/addTarget';
import Data from './mainareas/data';

function Dashboard() {

    const dispatch = useDispatch();

    let logoutFunction = function() {
        fetch(API_SERVER + '/logout', {
            method: "GET",
            credentials: 'include'
        }).finally(() => {
            dispatch(setto("{\"state\":\"login\"}"))
        })
    }

    let adminSetting = window.localStorage.getItem('admin') === 'true' ? (
        <button>Adminsettings</button>
    ) : {};

    return (
        <div className="Dashboard App">
            <div className="Header">
                <img src="/logo.svg" alt="logo"/>
                <h1>sLoader</h1>
                <div className="Flexspacer"/>
                <button className="Userpanel">
                    <div className="UserPanelBox">
                        <img src="/person.svg" alt="person" />
                        <span className="FullName">{window.localStorage.getItem("name")}</span>
                    </div>
                    <div className="Userpanel-Dropdown-Content">
                        {adminSetting}
                        <button>Usersettings</button>
                        <button onClick={logoutFunction}>Logout</button>
                    </div>
                </button>
                
            </div>
            <MainAreaContainer/>
        </div>
    )
}


function MainAreaContainer() {
    const [targets, setTargets] = useState(undefined);

    if(targets === undefined) {
        fetch(API_SERVER + '/targets', {
            method: 'GET',
            credentials: 'include',
        }).then(r => {
            return r.json();
        }).then(r => {
            setTargets(r.targets)
        })
    }

    return (
        <div className="MainAreaContainer">
            <TargetList targets={targets === undefined ? [] : targets}/>
            <MainArea/>
        </div> 
    )
}


function TargetList(props) {
    const dispatch = useDispatch();

    let addTargetButton;

    let addTargetHander = function() {
       dispatch(ma_setto("{\"state\":\"add_target\"}"))
    }

    if (window.localStorage.getItem('admin') === 'true') {
        addTargetButton = (
            <button onClick={addTargetHander} id="AddTargetButton">
                <span>Add Target</span>
                <img src="/hddadd.svg" alt="Add target"/>
            </button>
        )
    }
    else {
        addTargetButton = {}
    }

    let targetDataHandler = function(e, uuid) {
        e.preventDefault();
        
        let dispatchValue = {
            state: 'data',
            uuid: uuid,
        }

        dispatch(ma_setto(JSON.stringify(dispatchValue)))
    }

    let targetList = [];
    if (props.targets.length === 0) {
        targetList.push((
            <div className='NaggerEmpty' key="none">
                <span>Its so empty here...</span>
                <br/>
                <span>Liven it up a bit by adding targets!</span>
            </div>
        ))
    }
    else {
        props.targets.forEach(e => {
            targetList.push((
                <button className="TargetEntry" key={e.target_id} onClick={ev => {targetDataHandler(ev, e.target_id)}}>
                    <img src="/hdd.svg" alt=""/>
                    <span className="TargetEntryName">{e.nick_name}</span>
                    <span className="TargetEntryID">{e.target_id}</span>
                </button>
            ))
        })
    }

    return (
        <div className="StorageTargetArea">
            <div className="StorageTargetList">
                {targetList}
            </div>
            {addTargetButton}
        </div>
    )
}

function MainArea() {
    const mainAreaState = useSelector(selectMainArea);

    const mainAreaStateParsed = JSON.parse(mainAreaState);

    switch (mainAreaStateParsed.state) {
        case "home": 
            return (<Home/>)
        case "add_target":
            return (<AddTarget/>)
        case "data":
            return (<Data target_id={mainAreaStateParsed.uuid}/>)
        default:
            return (<span>MAINAREA {mainAreaStateParsed.state} not defined</span>)
    }
}

export default Dashboard;