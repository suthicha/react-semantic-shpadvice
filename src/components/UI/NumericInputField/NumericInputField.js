import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';
import classes from './NumericInputField.css';

class NumericInputField extends Component {

    state = {
        value: '',
    };

    getProps = () => {
        return {
            id: this.props.id,
            value: this.state.value.toString(),
        }
    };

    getValue = () => {
        return this.state;
    };

    getId = () => {
        return this.props.id
    };

    updateValue =(newVal) => {
        this.setState({ value: newVal });
    };

    componentDidMount() {
        if (this.props.value){
            this.setState({value: this.props.value});
        }
    };

    handleValueChanged = (data) => {
        this.setState({value:data})
    };

    render(){
        let fieldClass = [classes.InputField]

        return (
            <NumericInput 
                style={{
                    wrap: {
                        display: 'inherit !important'
                    },
                    arrowUp: {
                        display: 'none',
                        border: 'none'
                    },
                    arrowDown: {
                        display: 'none',
                        border: 'none'
                    }
                }}
                className={fieldClass.join(' ')}
                precision={4} 
                value={this.state.value}
                onChange={this.handleValueChanged}  />   
        );
    }
};

NumericInputField.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
}

export default NumericInputField;
