import React, {Component} from 'react';
import './Countries.css';

class Countries extends Component {
    render() {
        return (
            <div className="countries" onClick={this.props.clicked}>
                <p className="name">{this.props.name}</p>
            </div>
        )
    }
}

export default Countries;