import React, { Component } from 'react';
import "./Covid.css"
import {withRouter} from "react-router";

class Covid extends Component {
    constructor() {
        super();
        this.state = {
            country: {}
        }

    }

    componentDidMount() {
        const{country_selection} = this.props.match.params;
        fetch(`https://api.covid19api.com/total/country/${country_selection}/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            this.setState({
                country:data
            })
        })
    }

    _clicked() {
        window.location.href = `/`;
    }


    render() {
        return(
            <div className = "covid-data">
                <h1> HELLO</h1>
                <p> {this.state.country.confirmed}</p>
                <button id= "go-back" onClick = {this._clicked}> Back </button>
                
            </div>
        );
    }
}

export default withRouter(Covid);