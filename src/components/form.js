import React, {Component} from 'react';
import {Form, FormControl, FormGroup, Col, ControlLabel} from 'react-bootstrap';

export default class myForm extends Component {
    state = {
        totalAmount: 1000000
    };

    handleChange(event) {
        console.log(event.target.name, this.state);
        this.setState({
            [event.target.name]: event.target.value
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
                        <FormControl
                            type="number"
                            name="totalAmount"
                            placeholder="Total amount"
                            value={this.state.totalAmount}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} >
                        Procents
                    </Col>
                    <Col>
                        <FormControl type="number" placeholder="Procents"/>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}
