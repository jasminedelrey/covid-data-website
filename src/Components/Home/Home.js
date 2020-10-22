import React, { Component } from 'react';
import "./Home.css"
import {withRouter} from "react-router";

class Home extends Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
        this.state = {
            cases: {},
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

        let country_list = {};


        fetch("https://api.covid19api.com/countries")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
               
                let option = document.createElement('option');
                option.text = data[i].Country;
               
                option.value = data[i].Slug;
                dropdown.add(option);
            }
            this.setState({
                cases:data
            })
            console.log(this.state.cases[0].Slug)
        })
    }

    _clicked() {
        window.location.href = `/countries/${this.state.selection}`;
    }
    

    selected(event) {
        this.setState ({
            selection: event.target.value
        })
        console.log(this.state.selection);
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