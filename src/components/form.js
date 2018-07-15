import React, {Component} from 'react';
import {Form, FormGroup, Col, ControlLabel} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

export default class myForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalAmount: 1000000
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        console.log(value);
        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        return (
            <Form horizontal width={800}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel}>
                        Total amount
                    </Col>
                    <Col>
                        <NumberFormat
                            displayType={'input'}
                            thousandSeparator={true}
                            name="totalAmount"
                            placeholder="Total amount"
                            value={this.state.totalAmount}
                            onValueChange={(values, event) => {
                                const {value} = values;
                                console.log(value);
                                this.handleChange(event, value);
                            }}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel}>
                        Procents
                    </Col>
                    <Col>
                        <NumberFormat placeholder="Procents"/>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}
