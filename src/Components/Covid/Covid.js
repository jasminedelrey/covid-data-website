import React, { Component } from 'react';
import "./Covid.css"
import {withRouter} from "react-router";
import {Button} from 'react-bootstrap';
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

    componentDidMount() {
        const{country_name} = this.props.match.params;
        console.log(country_name)
        let new_country_name = country_name.replace(/-/g,' ').split(' ')
        for (let i= 0; i<new_country_name.length; i++) {
            new_country_name[i] = new_country_name[i].charAt(0).toUpperCase() + new_country_name[i].substring(1)
        }
        new_country_name = new_country_name.join(' ')
        new_country_name = (new_country_name == "Korea North" ? new_country_name = "North Korea" : new_country_name)
        new_country_name = (new_country_name == "Korea South" ? new_country_name = "South Korea" : new_country_name)

        this.setState({
            country_title: new_country_name
        })


        fetch(`https://api.covid19api.com/total/country/${country_name}/status/confirmed?from=2020-10-01T00:00:00Z&to=2020-10-28T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            for (let i = 0; i< data.length; i++) {
                this.setState({
                    confirmed : this.state.confirmed + data[i].Cases,
                    country: data
            })
        }
    })
        fetch(`https://api.covid19api.com/total/country/${country_name}/status/deaths?from=2020-10-01T00:00:00Z&to=2020-10-28T00:00:00Z`)
        .then(response => response.json())
        .then(data=> {
            for (let i = 0; i< data.length; i++) {
                this.setState({
                    deaths : this.state.deaths + data[i].Cases,
                    country: data
            })
        }
    })
        fetch(`https://api.covid19api.com/total/country/${country_name}/status/recovered?from=2020-10-01T00:00:00Z&to=2020-10-28T00:00:00Z`)
       
        .then(response => response.json())
        .then(data=> {
            for (let i = 0; i< data.length; i++) {
                this.setState({
                    recovered : this.state.recovered + data[i].Cases,
                    country: data
            })

            console.log("Current confirmed cases:" + this.state.confirmed)
        }
    })
}


    _clicked() {
        window.location.href = `/`;
    }


    render() {
        return(
            <div id = "covid-page">
            <div id = "title">
            <h1> {this.state.country_title}</h1>
            <h2> {this.state.country_title == "North Korea" ? "Oh no" : ""}</h2>
            </div>
            
            <div id = "covid-data">
                
                <div className = "confirmed">
                    <div className = "confirmed-inner">
                        <div className = "confirmed-front">
                            <p> Confirmed</p>
                        </div>
                        <div className = "confirmed-back">
                            <p className= "cases-style"> {this.state.confirmed}</p>
                        </div>
                    </div>
                </div>
                
                <div className = "deaths">
                    <div className = "deaths-inner">
                        <div className = "deaths-front">
                            <p> Deaths</p>
                        </div>
                        <div className = "deaths-back">
                            <p className= "cases-style"> {this.state.deaths}</p>
                        </div>
                    </div>
                </div>
                
                <div className = "recovered">
                    <div className = "recovered-inner">
                        <div className = "recovered-front">
                            <p> Recovered</p>
                        </div>
                        <div className = "recovered-back">
                            <p className= "cases-style"> {this.state.recovered}</p>
                        </div>
                    </div>
                </div>
                
                
                
                
                
                
                
            </div>

            <div id = "button">
            <Button variant="primary" id= "go-back" onClick = {this._clicked}> Back </Button>
            </div>

            </div>
        );
    }
}

export default withRouter(Covid);