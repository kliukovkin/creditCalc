import React, {Component} from 'react';
import './form.css'

export default class Form extends Component {
    state = {
        totalAmount: 1000000
    };
    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <form>
                <div className="attrWrapper">
                    <label htmlFor="totalAmount">Total amount</label>
                    <input type="number" name="totalAmount" value={this.state.totalAmount} onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="attrWrapper">
                    <label htmlFor="procents">Procents</label>
                    <input type="number" name="procents"/>
                </div>
            </form>
        )
    }
}
