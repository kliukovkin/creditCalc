import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Radio, Button } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import './style.css';

export class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmount: '',
            percents: '',
            term: '',
            payment: '',
            selectedOption: 'term',
            earlyPayment: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleInput(options, event) {
        const { value: changedvalue } = options;

        this.setState({
            [event.target.name]: changedvalue
        });
    }

    handleRadioChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    isValidValues() {
        let { totalAmount, percents, term, payment } = this.state;
        if (this.state.selectedOption === 'term') {
            return !!(totalAmount && percents && term);
        } else {
            return !!(totalAmount && percents && payment);
        }


    }

    calculate() {

        let { totalAmount, percents, term: months, payment, earlyPayment } = this.state;
        const MIR = percents  / (12*100);//MIR = monthly interested rate
        const annuityFactor = MIR * Math.pow( (1+MIR), + months ) / ( Math.pow( (1+MIR), + months ) - 1 );

        payment = annuityFactor * totalAmount;
        payment = payment - (payment % 1);
        this.setState({
            totalAmount,
            percents,
            term: months,
            payment,
            earlyPayment
        });
    }

    submit() {
        if (this.isValidValues()) {
            this.calculate();
        }
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <ControlLabel>
                        Total amount
                    </ControlLabel>{' '}
                    <NumberFormat
                        displayType={'input'}
                        thousandSeparator={true}
                        name="totalAmount"
                        suffix={' c.u.'}
                        placeholder="Total amount"
                        value={this.state.totalAmount}
                        onValueChange={this.handleInput}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        Percents
                    </ControlLabel>{' '}
                    <NumberFormat
                        displayType={'input'}
                        decimalScale={1}
                        fixedDecimalScale={true}
                        suffix={' %'}
                        name="percents"
                        placeholder="Percents"
                        value={this.state.percents}
                        isAllowed={(values) => {
                            const { value } = values;
                            return value < 100;
                        }}
                        onValueChange={this.handleInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Radio
                        name="radioGroup"
                        inline
                        value={'term'}
                        checked={this.state.selectedOption === 'term'}
                        onChange={this.handleRadioChange}>
                        Term
                    </Radio>{' '}
                    <NumberFormat
                        displayType={'input'}
                        suffix={' month'}
                        name="term"
                        placeholder="Term(months)"
                        value={this.state.term}
                        onValueChange={this.handleInput}
                        disabled={this.state.selectedOption !== 'term'}
                    />
                </FormGroup>
                <FormGroup>
                    <Radio
                        name="radioGroup"
                        inline
                        value={'payment'}
                        checked={this.state.selectedOption === 'payment'}
                        onChange={this.handleRadioChange}>
                        Payment
                    </Radio>{' '}
                    <NumberFormat
                        displayType={'input'}
                        thousandSeparator={true}
                        suffix={' c.u.'}
                        name="payment"
                        placeholder="Payment"
                        value={this.state.payment}
                        onValueChange={this.handleInput}
                        disabled={this.state.selectedOption !== 'payment'}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        Early repayment
                    </ControlLabel>{' '}
                    <NumberFormat
                        displayType={'input'}
                        thousandSeparator={true}
                        suffix={' c.u.'}
                        name="earlyPayment"
                        placeholder="early payment"
                        value={this.state.earlyPayment}
                        onValueChange={this.handleInput}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    onClick={(e) => {
                    e.preventDefault();
                    this.calculate();
                }}>
                    Calculate
                </Button>
            </Form>
        );
    }
}
