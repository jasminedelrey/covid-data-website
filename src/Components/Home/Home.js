import React, { Component } from 'react';
import "./Home.css"
import {withRouter} from "react-router";
import {Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

    constructor() {
        super();
        this.inputRef = React.createRef();
        this.state = {
            cases: [],
            countries: [],
            selection: "Choose Country"
        }
        this._clicked = this._clicked.bind(this);
        this.selected = this.selected.bind(this);
    }

    componentDidMount() {

        const provinces = ['virgin-islands',
'wallis-and-futuna-islands', 'us-minor-outlying-islands', 
'turks-and-caicos-islands', 'tokelau', 'svalbard-and-jan-mayen-islands', 'south-georgia-and-the-south-sandwich-islands', 
'saint-pierre-and-miquelon', 'saint-martin-french-part', 'saint-helena', 'saint-barthelemy', 'reunion', 'puerto-rico', 
'pitcairn', 'northern-mariana-islands', 'norfolk-island', 'niue', 'new-caledonia', 'netherlands-antilles', 'montserrat', 
'mayotte', 'martinique', 'macao-sar-china', 'jersey', 'isle-of-man', 'hong-kong-sar-china', 'heard-and-mcdonald-islands', 
'guernsey', 'guam', 'guadeloupe', 'greenland', 'gibraltar', 'french-southern-territories', 'french-polynesia', 'french-guiana', 
'faroe-islands', 'falkland-islands-malvinas','cocos-keeling-islands', 'cook-islands','christmas-island', 'cayman-islands', 'british-virgin-islands', 
'british-indian-ocean-territory', 'bouvet-island', 'bermuda', 'ala-aland-islands','american-samoa', 'anguilla', 
'antarctica', 'aruba']


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
                if(provinces.indexOf(data[i].Slug) === -1 ) 
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
        })
    }

    selected(event) {
        this.setState ({
            selection: event.target.value
        })
    }

    _clicked() {
        if (this.state.selection !== "Choose Country") {
            window.location.href = `/result/${this.state.selection}`;
        }
        else {
            let message = document.getElementById('error-message')
            message.classList.remove("hidden")
        }
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
            <Button variant= "primary" className="btn-primary" onClick = {this._clicked}> Search </Button> {' '}
            <p id= "error-message" className = "hidden"> No country was selected. Please select a country.</p>
            
            </div>
        </div>
    );
}
}
export default Home;