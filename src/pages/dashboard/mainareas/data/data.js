import React from "react";

import {filesize} from "filesize";

class Data extends React.Component {
    constructor(props) {
        super(props);

        this.path = [];

        this.state = {
            directories: [],
            files: [],
        }

        this.buildDirectoryStructure()
    }

    componentDidUpdate(previousProps) {
        if(this.props.target_id !== previousProps.target_id) {
            this.path = [];
            this.buildDirectoryStructure();
        }
    }

    assemblePath() {
        let assembled_path = this.path.length === 0 ? "/" : "";

        this.path.forEach(e => {
            assembled_path += e + '/';
        })

        return assembled_path;
    }

    buildDirectoryStructure() {
        let assembled_path = this.assemblePath();

        const target_sub_uri = `/contents/${this.props.target_id}/${encodeURIComponent(assembled_path)}`;

        fetch(window.api_server + target_sub_uri, {
            method: "GET",
            credentials: "include"
        }).then(r => {
            return r.json();
        }).then(r => {
            this.setState( 
                {
                    directories: r.directories,
                    files: r.files,
                }
            );
        })
    }

    buildDirectoriesHTML() {
        let html = [];

        let handleDirClick = function(e, name) {
            e.preventDefault();
            this.path.push(name);
            this.buildDirectoryStructure();
        }.bind(this);

        this.state.directories.forEach(e => {
            html.push((
                <button className="DataEntry" key={e} onClick={(ev) => {handleDirClick(ev, e)}}>
                    <img src="/folder.svg" alt="folder"/>    
                    <span className="Filename">{e}</span>
                </button>
            ))
        })


        return html;
    }

    buildFilesHTML() {
        let html = [];

        let handleDownload = function(e, filename) {
            e.preventDefault();

            let assembled_path = this.assemblePath() + filename;

            window.location.assign(window.api_server + '/download/' + this.props.target_id + '/' + encodeURIComponent(assembled_path));
        }.bind(this);

        this.state.files.forEach(e => {
            html.push((
                <div className="DataEntry" key={e.name}>
                    <img src="/page.svg" alt="folder"/>   
                    <span className="Filename">{e.name}</span>
                    <span className="Filesize">
                        {filesize(e.size)}
                    </span>
                    <div className="ButtonDialog">
                        <button onClick={(ev) => {handleDownload(ev, e.name)}}>
                            <img alt="download" src="/download.svg"/>
                        </button>
                        <button><img alt="link" src="/link.svg"/></button>
                        <button><img alt="delete" src="/delete.svg"/></button>
                    </div>
                </div>

            ))
        })


        return html;
    }

    render() {

        let handlePopClick = function(e) {
            e.preventDefault();

            this.path.pop();
            this.buildDirectoryStructure();
        }.bind(this);

        let handleSubmit = function(e) {
            e.preventDefault();

            let name = e.target.files[0].name;

            let total_path = this.assemblePath() + name;

            let submit_api = window.api_server + '/upload/' + this.props.target_id + '/' + encodeURIComponent(total_path);

            e.target.parentElement.setAttribute("action",submit_api);
            e.target.parentElement.submit();
        }.bind(this);

        return (
            <div className="MainArea Data">
                <button className="DataEntry" onClick={handlePopClick} >
                    <img src="/parent.svg" alt="parent"/>   
                </button>
                {this.buildDirectoriesHTML()}
                {this.buildFilesHTML()}

                <form className="UploadFormButton" method="POST" action="" encType="multipart/form-data">
                    <label htmlFor="FileUploader">
                        <img src="/upload.svg" alt="upload" />
                    </label>
                    <input id="FileUploader" type="file" name="file" onChange={handleSubmit}/>
                </form>
            </div>
        )
    }

}

export default Data;