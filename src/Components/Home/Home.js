import React, { Component } from 'react';
import "./Home.css"
import {withRouter} from "react-router";

class Home extends Component {

render(){
    return(
        <div className = "home">
            <div className = "title">
            <h1>Search Covid-19 data by Country</h1>
        </div>

        <div className = "Search">
        <input type = "text" className = "searchBar"
          placeholder= "Search..."
          ref = {this.inputRef}
          />

        </div>

        </div>

    )
}
}
export default Home;