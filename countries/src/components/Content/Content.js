import React, {Component} from 'react';
import './Content.css';
import InfoCountry from "./InfoCountry/InfoCountry";

class Content extends Component {

    render(){
        return (
            <div className="content">
                <InfoCountry countryCode={this.props.countryCode}/>
            </div>
        )
    }
}

export default Content;