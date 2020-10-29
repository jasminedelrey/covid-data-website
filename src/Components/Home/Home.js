import React, { Component } from 'react';
import "./Home.css"
import {withRouter} from "react-router";

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
                country_names.push({key:data[i].Country, value: data[i].Slug})
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
                dropdown.add(option)
            }
            console.log(country_names[0].key);
        })
    }

    selected(event) {
        this.setState ({
            selection: event.target.value
        })
        console.log(event.target.value);
    }

    _clicked() {
        window.location.href = `/countries/${this.state.selection}`;
    }
    

render(){
    return(
        <div className = "home">
            <h1>
                COVID-Data Tracker
            </h1>
            <select onChange = {this.selected} id= "country-dropdown">
            </select>

            <button onClick = {this._clicked}> Click me!</button>
        </div>
    );
}
}
export default Home;