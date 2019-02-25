import React, {Component} from 'react';
import './BorderWithCountry.css'

class BorderWithCountry extends  Component{
    render(){
        return (
            <ul>
                <li>{this.props.name}</li>
            </ul>
        )
    }
}

export default BorderWithCountry;