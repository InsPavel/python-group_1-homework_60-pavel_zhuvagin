import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './RestCountries.css';

class RestCountries extends Component {
    state = {
        countires: []
    };

    componentDidMount() {
        fetch('https://restcountries.eu/').then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error ('Something went wrong with network request');
            })
            .then(countries => {
            console.log(countries)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <Fragment>
                <section className='conteiner'>

                </section>
            </Fragment>
        )
    }
}

export default RestCountries;