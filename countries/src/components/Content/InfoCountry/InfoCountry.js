import React, {Component} from 'react';
import axios from 'axios';
import './InfoCountry.css';
import BorderWithCountry from "./BorderWithCountry/BorderWithCountry";

class InfoCountry extends Component {
    state = {
        loadedCountry: null,
        borderCountry: []
    };

    componentDidUpdate() {

        let arr = [];

        if (this.props.countryCode) {
            if (!this.state.loadedCountry || this.props.countryCode !== this.state.loadedCountry.alpha3Code) {
                const BASE_URL = 'https://restcountries.eu/rest/v2/alpha/';
                axios.get(BASE_URL + this.props.countryCode)
                    .then(response => {
                        this.setState({
                            loadedCountry: response.data,
                            borderCountry: []
                        });
                    })
                    .then(response => {
                        const BASE_URL = 'https://restcountries.eu/rest/v2/alpha/';
                            return this.state.loadedCountry.borders.map(border => {
                                return axios.get(BASE_URL + border)
                                .then(borders => {
                                    arr.push(borders.data);
                                    this.setState({borderCountry: arr})
                                    })
                            })
                     })
            }
        }
    }


    render() {
        if(this.state.loadedCountry) {
            return (
                <div className="info_country">
                    <p>{this.state.loadedCountry.name}</p>
                    <p>Capital: {this.state.loadedCountry.capital}</p>
                    <p>Population: {this.state.loadedCountry.population}</p>
                    {this.state.borderCountry.map(country => <BorderWithCountry
                        key={country.alpha3Code}
                        name={country.name}
                    />
                    )}
                    <div className="flag">
                        <img src={this.state.loadedCountry.flag}/>
                    </div>
                </div>
            )
        }
        return <p style={{textAlign: 'center'}}>Please select a Country!</p>;

    }
}

export default InfoCountry;