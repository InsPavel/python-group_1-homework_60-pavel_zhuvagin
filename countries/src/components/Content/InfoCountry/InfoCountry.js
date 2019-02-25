import React, {Component, Fragment} from 'react';
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
                    .catch(error => {
                    console.log(error)
            })
            }
        }
    }


    render() {
        if(this.state.loadedCountry) {
            return (
                <Fragment>
                <div className="info_country">
                    <div className='row'>
                        <div className="col col-8">
                            <h1>{this.state.loadedCountry.name}</h1>
                            <p><span>Capital: </span>{this.state.loadedCountry.capital}</p>
                            <p><span>Population: </span>{this.state.loadedCountry.population.toLocaleString()}</p>
                        </div>
                        <div className="flag col col-4">
                            <img src={this.state.loadedCountry.flag} alt="flag"/>
                        </div>
                    </div>
                    </div>
                    <div className='borders_with_country'>
                        <h1>Borders with:</h1>
                        {this.state.borderCountry.map(country => <BorderWithCountry
                            key={country.alpha3Code}
                            name={country.name}
                        />
                        )}
                    </div>
                    </Fragment>
            )
        }
        return <p style={{textAlign: 'center'}}>Please select a Country!</p>;

    }
}

export default InfoCountry;