import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './RestCountries.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Countries from "../../components/Sidebar/Countries/Countries";

class RestCountries extends Component {
    state = {
        countries: []
    };

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code').then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error ('Something went wrong with network request');
            })
            .then(countries => {
                const updateCountries = countries.map(country => {
                    return {
                        ...country,
                    }
                });
                this.setState({countries: updateCountries})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <Fragment>
                <section className='container'>
                     <Sidebar>
                        {this.state.countries.map(country => <Countries
                            key={country.name}
                            name={country.name}
                        />)}
                        </Sidebar>
                </section>
            </Fragment>
        )
    }
}

export default RestCountries;