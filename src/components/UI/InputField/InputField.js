import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import classes from './InputField.css';

class InputField extends Component {

    state = {
        value: ''
    };

    getProps = () => {
        return {
            id: this.props.id,
            value: this.state.value,
        };
    };

    getValue = () => {
        return this.state;
    };

    getId = () => {
        return this.props.id
    };

    updateValue(newVal){
        this.setState({ value: newVal });
    };

    componentDidMount() {
        if (this.props.value){
            this.setState({value: this.props.value});
        }
    };

    handleValueChanged = (event) => {
        event.preventDefault();
        let newVal = event.target.value;
        
        if (this.props.maxLength !== 0)
        {
            if (newVal.length === (this.props.maxLength + 1))
            {
                return;
            }
        } 

        if (this.props.uppercase){
            newVal = newVal.toUpperCase();
        }

       
        this.setState({value: newVal});
    };

    render(){
        let fieldClass = [classes.InputField]

        return (
            <Input
                size="small"
                className={fieldClass.join(' ')}
                id={this.props.id} 
                type={this.props.type}
                value={this.state.value} 
                placeholder={this.props.placeholder}
                onChange={this.handleValueChanged} />
        );
    }
};

InputField.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    maxLength: PropTypes.number,
    uppercase: PropTypes.bool,
    placeholder: PropTypes.string,
}

InputField.defaultProps = {
    maxLength: 0,
    type: 'text',
    placeholder: '',
    uppercase: false,
}

export default InputField;