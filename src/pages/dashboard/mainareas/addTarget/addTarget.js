import {ma_setto} from './../../../../features/mainAreaState/mainAreaSlice.js';
import { useDispatch } from 'react-redux';
import React from 'react';

import {API_SERVER} from './../../../../config'

function AddTarget() {
    const dispatch = useDispatch();


    function handleSubmit(e) {
        e.preventDefault()

        let requestBody = {};

        requestBody.name = document.getElementById("name").value;
        requestBody.path = document.getElementById("DirectoryPicker").attributes["value"].value;

        
        fetch(API_SERVER + '/createTarget', {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(requestBody),
        })

        dispatch(ma_setto('{"state":"home"}'));
    }

    return (
        <div className="MainArea AddTarget">
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Nickname</label>
                <input id="name" defaultValue="DefaultTarget"></input>
                <DirectoryPicker/>
                <input type="submit" value="Select this folder"></input>
            </form>
        </div>
    )
}

class DirectoryPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current_dirs: ['/'],
            list_dirs: []
        };

        this.fetchListDirs(this.state.current_dirs);
    }

    joinDirList(list) {
        let dirString = "";

        list.forEach(e => {
            if (e[0] === '/') {
                dirString += e;
            }
            else {
                dirString += `${e}/`;
            }
        })

        return dirString;
    }

    fetchListDirs(current_dirs) {
        let dirString = this.joinDirList(current_dirs);


        
        fetch(API_SERVER + '/directories/' + encodeURIComponent(dirString), {
            credentials: 'include'
        }).then(r => {
            return r.json();
        }).then(r => {
            this.setState(
                {
                    list_dirs: r.directories,
                    current_dirs: current_dirs,
                })
        });
    }

    displayDirectoryPathList() {
        let listEntries = [];

        this.state.current_dirs.forEach(e => {
            listEntries.push((
                <button key={e}>{e}</button>
            ))

            listEntries.push((
                <span>⮞</span>
            ))
            
        });

        listEntries.pop();

        return (
            <div className="DirectoryList">
                {listEntries}
            </div>
        )
    }

    displayDirectoryList() {
        let htmlEntries = [];

        let handleClick = function(event, dir) {
            event.preventDefault();

            this.fetchListDirs(this.state.current_dirs.concat([dir]));
        }.bind(this);

        this.state.list_dirs.forEach(i => {
            htmlEntries.push((
                <button className="DirectoryEntry" onClick={e => {handleClick(e,i)}} key={i}>{i}</button>
            )) 
        });

        return (
            <div className="DirectoryEntries">
                {htmlEntries} 
            </div>
        )
    }

    render() {
        return (
            <div className="DirectoryPicker" id="DirectoryPicker" value={this.joinDirList(this.state.current_dirs)} >
                {this.displayDirectoryPathList()}
                {this.displayDirectoryList()}
            </div>
        )
    }
}

export default AddTarget;