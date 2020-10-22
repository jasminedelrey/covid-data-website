import React, { Component } from 'react';
import "./Covid.css"
import {withRouter} from "react-router";

class Covid extends Component {

    _clicked() {
        window.location.href = `/`;
    }


    render() {
        return(
            <div className = "covid-data">
                <button id= "go-back" onClick = {this._clicked()}> Back </button>
            </div>
        );
    }
}

export default Covid;