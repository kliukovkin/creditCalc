import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, Radio} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import './form.css';

export default class myForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalAmount: '',
            percents: '',
            date: '',
            payment: '',
            selectedOption: 'date'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleInput(values, event) {
        const {value} = values;
        this.setState({
            [event.target.name]: value
        });
    }
    handleRadioChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <ControlLabel>
                        Total amount
                    </ControlLabel>{" "}
                        <NumberFormat
                            displayType={"input"}
                            thousandSeparator={true}
                            name="totalAmount"
                            suffix={" c.u."}
                            placeholder="Total amount"
                            value={this.state.totalAmount}
                            onValueChange={this.handleInput.bind(this)}
                        />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        Percents
                    </ControlLabel>{" "}
                        <NumberFormat
                            displayType={"input"}
                            decimalScale={1}
                            fixedDecimalScale={true}
                            suffix={' %'}
                            name="percents"
                            placeholder="Percents"
                            value={this.state.percents}
                            isAllowed={(values) => {
                                const {value} = values;
                                return value < 100
                            }}
                            onValueChange={this.handleInput.bind(this)}
                        />
                </FormGroup>
                <FormGroup>
                    <Radio
                        name="radioGroup"
                        inline
                        value={"date"}
                        checked={this.state.selectedOption === "date"}
                        onChange={this.handleRadioChange}>
                        Date
                    </Radio>{' '}
                    <NumberFormat
                        displayType={"input"}
                        suffix={' month'}
                        name="date"
                        placeholder="Date"
                        value={this.state.date}
                        onValueChange={this.handleInput.bind(this)}
                        disabled={this.state.selectedOption !== "date"}
                    />
                </FormGroup>
                <FormGroup>
                    <Radio
                        name="radioGroup"
                        inline
                        value={"payment"}
                        checked={this.state.selectedOption === "payment"}
                        onChange={this.handleRadioChange}>
                    Payment
                    </Radio>{' '}
                    <NumberFormat
                        displayType={"input"}
                        suffix={" c.u."}
                        name="payment"
                        placeholder="Payment"
                        value={this.state.payment}
                        onValueChange={this.handleInput.bind(this)}
                        disabled={this.state.selectedOption !== "payment"}
                    />
                </FormGroup>
            </Form>
        )
    }
}
