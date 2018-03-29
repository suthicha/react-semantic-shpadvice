import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';

class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: false,
        agreeTeams: false,
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.resError){
            this.setState({error: true});
        }
    };

    inputChangedHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]:value});
    };

    checkboxClickHandler = (event) => {
        const { id, checked } = event.target;
        this.setState({[id]:checked});
    };

    submitHandler = () => {
        const { email, password } = this.state;
        if (email === "" || password === ""){
            this.setState({error: true})
            return;
        }
        this.props.submitForm(email, password);
        this.setState({error: false});
    };

    render() {
        let msgError = "You can only sign up for an account once with a given e-mail address.";
        if (this.props.resError){
            const { message } = this.props.resError.response.data;
            if (message === "auth fail"){
                msgError = "Authenticated Fail, Please check your email or password.";
            }else {
                msgError = message;
            }
        }

        return (
            <div>
                <Form 
                    onSubmit={this.submitHandler} 
                    error={this.state.error}
                    loading={this.props.loading}>
                    <Form.Field required>
                        <label>Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            placeholder='Email' 
                            onChange={(event) => this.inputChangedHandler(event)}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder='Password' 
                            onChange={(event) => this.inputChangedHandler(event)}/>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox 
                            id="agreeTeams" 
                            label='I agree to the Terms and Conditions'
                            onClick={(event) => this.checkboxClickHandler(event)} />
                    </Form.Field>
                    <Message
                        error
                        header='Warning...'
                        content={msgError} />
                    <Button type='submit' disabled={!this.state.agreeTeams} >Submit</Button>
                </Form>
            </div>
        );
    }
};

LoginForm.propTypes = {
    submitForm: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

LoginForm.defaultProps = {
    loading: false,
};

const mapStateToProps = state => {
    return {
        resError: state.authAgent.error,
    }
};

export default connect(mapStateToProps)(LoginForm);
