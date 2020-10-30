import React, { Component } from 'react';
import "./Home.css"
import {withRouter} from "react-router";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.state = {
            cases: [],
            countries: [],
            selection: ""
        }
        this._clicked = this._clicked.bind(this);
        this.selected = this.selected.bind(this);
    }

    componentDidMount() {
        let dropdown = document.getElementById('country-dropdown');
        dropdown.length = 0;

        let defaultOption = document.createElement('option');
        defaultOption.text = "Choose Country";
        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;

        let country_names = [];


        fetch("https://api.covid19api.com/countries")
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                country_names.push({key: data[i].Country, value: data[i].Slug})
            }

            this.setState({
                cases:country_names
            })

            country_names = country_names.sort(function (a,b) {
                return a.value.localeCompare(b.value)
            });

            for(let i = 0; i < country_names.length; i++) {
                let option = document.createElement('option')
                option.text = country_names[i].key
                option.value = country_names[i].value
                option.id = country_names[i].key
                dropdown.add(option)
            }
            console.log(country_names[0].key);
        })
    }

    selected(event) {
        this.setState ({
            selection: event.target
        })
        console.log(event.target);
    }

    _clicked() {
        window.location.href = `/result/${this.state.selection.value}`;
    }
    

render(){
    return(
        <div className = "home">
            <h1>
                COVID-Data Tracker
            </h1>

            <h3>
                Pick a country to check COVID-19 confirmed cases, recovered cases, and deaths for October 2020
            </h3>
            <div className="selection-bar">

            <select onChange = {this.selected} id= "country-dropdown"></select>
            <Button variant= "primary" className="btn-primary" onClick = {this._clicked}> Click me!</Button> {' '}
            
            </div>
        </div>
    );
}
}
export default Home;