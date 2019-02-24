import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './RestCountries.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Countries from "../../components/Sidebar/Countries/Countries";
import Content from "../../components/Content/Content";

class RestCountries extends Component {
    state = {
        countries: [],
        selectedCountryName: null,
    };

    componentDidMount() {
        const BASE_URL = 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code';
        axios.get(BASE_URL).then(response => {
            return Promise.all(response.data.map(country => {
                return axios.get(BASE_URL)
                    .then(response => {
                        return {
                        ...country,
                        }
                    });
                }));
            })
            .then(countries => {
                this.setState({countries: countries})
            })
            .catch(error => {
                console.log(error)
            })
    }

    countrySelectHandler = name => {
        this.setState({selectedCountryName: name})
    };


    render() {
        return (
            <Fragment>
                <section className='my_container'>
                    <div className="row">
                        <div className="col col-3">
                            <Sidebar>
                                {this.state.countries.map(country => <Countries
                                    key={country.name}
                                    name={country.name}
                                    clicked = {() => this.countrySelectHandler(country.alpha3Code)}
                                />)}
                            </Sidebar>
                        </div>
                        <div className="col col-9">
                            <Content countryCode={this.state.selectedCountryName}/>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default RestCountries;