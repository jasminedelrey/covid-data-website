import React, { Component } from 'react';
import "./Covid.css"
import {withRouter} from "react-router";
import {Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class Covid extends Component {
    constructor() {
        super();
        this.state = {
            country_name: {},
            recovered: 0,
            deaths: 0,
            confirmed: 0,
            country_title: ""
        }

    }
    // https://api.covid19api.com/total/country/${country_name}/status/deaths?from=2020-10-01T00:00:00Z&to=2020-10-28T00:00:00Z
    componentDidMount() {
        const{country_name} = this.props.match.params;
        console.log(country_name)
        let new_country_name = country_name.replace(/-/g,' ').split(' ')
        for (let i= 0; i<new_country_name.length; i++) {
            new_country_name[i] = new_country_name[i].charAt(0).toUpperCase() + new_country_name[i].substring(1)
        }
        new_country_name = new_country_name.join(' ')
        new_country_name = (new_country_name === "Korea North" ? new_country_name = "North Korea" : new_country_name)
        new_country_name = (new_country_name === "Korea South" ? new_country_name = "South Korea" : new_country_name)

        this.setState({
            country_title: new_country_name
        })

        fetch(`https://api.covid19api.com/country/${country_name}/status/confirmed?from=2020-10-01T00:00:00Z&to=2020-10-31T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            let first_day = 0;
            let last_day = 0;

            for (let i = 0; i< data.length; i++) {
                // console.log(data[i])
                if (data[i].Date === "2020-10-01T00:00:00Z" && data[i].Province === "") {
                    first_day = first_day + data[i].Cases
                    console.log(first_day)
                    
                }
                else if (data[i].Date === "2020-10-30T00:00:00Z" && data[i].Province === "") {
                    last_day = last_day + data[i].Cases
                    console.log(last_day)
                }
                this.setState({
                    confirmed : last_day - first_day,
                    country: data
            })
        }
    })
        fetch(`https://api.covid19api.com/total/country/${country_name}/status/deaths?from=2020-10-01T00:00:00Z&to=2020-10-31T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            let first_day = 0;
            let last_day = 0;

            for (let i = 0; i< data.length; i++) {
                console.log(data[i])
                if (data[i].Date === "2020-10-01T00:00:00Z" && data[i].Province === "") {
                    first_day = first_day + data[i].Cases
                    console.log(first_day)
                    
                }
                else if (data[i].Date === "2020-10-30T00:00:00Z" && data[i].Province === "") {
                    last_day = last_day + data[i].Cases
                    console.log(last_day)
                }
                this.setState({
                    deaths : last_day - first_day,
                    country: data
            })
        }
    })
        fetch(`https://api.covid19api.com/total/country/${country_name}/status/recovered?from=2020-10-01T00:00:00Z&to=2020-10-31T00:00:00Z`)
       
        .then(response => response.json())
        .then(data=> {
            let first_day = 0;
            let last_day = 0;

            for (let i = 0; i< data.length; i++) {
                console.log(data[i])
                if (data[i].Date === "2020-10-01T00:00:00Z" && data[i].Province === "") {
                    first_day = first_day + data[i].Cases
                    console.log(first_day)
                    
                }
                else if (data[i].Date === "2020-10-30T00:00:00Z" && data[i].Province === "") {
                    last_day = last_day + data[i].Cases
                    console.log(last_day)
                }
                this.setState({
                    recovered : last_day - first_day,
                    country: data
            })
        }
    })
}


    _clicked() {
        window.location.href = `/`;
    }


    render() {
        return(
            <div id = "covid-page">

            <div id = "button">
            <Button id= "go-back" variant="outline-primary" onClick = {this._clicked}>  Back </Button>
            </div>

            <div id = "title">
            <h1> {this.state.country_title}</h1>
            <h2> {this.state.country_title == "North Korea" ? <Alert variant="danger"> No data available. Please pick a different country.</Alert>: ""}</h2>
            </div>
            
            <div id = "covid-data">
                
                <div className = "confirmed">
                    <div className = "confirmed-inner">
                        <div className = "confirmed-front">
                            <p> Total Confirmed Cases</p>
                        </div>
                        <div className = "confirmed-back">
                            <p className= "cases-style"> {this.state.confirmed}</p>
                        </div>
                    </div>
                </div>
                
                <div className = "deaths">
                    <div className = "deaths-inner">
                        <div className = "deaths-front">
                            <p> Total Deaths</p>
                        </div>
                        <div className = "deaths-back">
                            <p className= "cases-style"> {this.state.deaths}</p>
                        </div>
                    </div>
                </div>
                
                <div className = "recovered">
                    <div className = "recovered-inner">
                        <div className = "recovered-front">
                            <p> Total Recovered Cases</p>
                        </div>
                        <div className = "recovered-back">
                            <p className= "cases-style"> {this.state.recovered}</p>
                        </div>
                    </div>
                </div>
                
                
                
                
                
                
                
            </div>
​
            </div>
        );
    }
}

export default withRouter(Covid);