import React, { Component } from 'react';
import "./Covid.css"
import {withRouter} from "react-router";


class Covid extends Component {
    constructor() {
        super();
        this.state = {
            country: {},
            recovered: 0,
            deaths: 0,
            confirmed: 0,
            country_name: ""
        }

    }

    componentDidMount() {
        const{country} = this.props.match.params;
        console.log(country)
        this.setState({
            country_name: country
        })
        let case_types = ['confirmed', 'deaths', 'recovered']
        // let requests = case_types.map(type => fetch())
        let response1,response2,response3

        fetch(`https://api.covid19api.com/total/country/${country}/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            for (let i = 0; i< data.length; i++) {
                this.setState({
                    confirmed : this.state.confirmed + data[i].Cases,
                    country: data
            })
        }
    })
        fetch(`https://api.covid19api.com/total/country/${country}/status/deaths?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            for (let i = 0; i< data.length; i++) {
                this.setState({
                    deaths : this.state.deaths + data[i].Cases,
                    country: data
            })
        }
    })
        fetch(`https://api.covid19api.com/total/country/${country}/status/recovered?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`)
       
        .then(response => response.json())
        .then(data=> {
            for (let i = 0; i< data.length; i++) {
                this.setState({
                    recovered : this.state.recovered + data[i].Cases,
                    country: data
            })

            console.log(data[0].Date)
            console.log("Current confirmed cases:" + this.state.confirmed)
        }
    })
}


    _clicked() {
        window.location.href = `/`;
    }


    render() {
        return(
            <div className = "covid-data">
                <h1> {this.state.country_name}</h1>
                <div id = "confirmed">
                <p> Confirmed Cases: {this.state.confirmed}</p>
                    </div>
                <div id = "deaths">
                <p> Deaths: {this.state.deaths}</p>
                </div>
                <div id = "recovered">
                <p> Recovered: {this.state.recovered}</p>
                </div>
                <button id= "go-back" onClick = {this._clicked}> Back </button>
                
            </div>
        );
    }
}

export default withRouter(Covid);