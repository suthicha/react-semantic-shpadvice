import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Input, Button, Icon } from 'semantic-ui-react';

class ShippingAdviceSearch extends Component {
    state = {
        searchVal: ''
    };

    handleOnClick = (event) => {
        event.preventDefault();
        if (this.state.searchVal.length === 0){
            return;
        }
        this.props.clickSearch(this.state.searchVal);
    };

    handleOnChange = (event) => {
        event.preventDefault();
        this.setState({searchVal: event.target.value.toUpperCase()});
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 13){
            if (this.state.searchVal.length >= 3){
                this.props.clickSearch(this.state.searchVal);        
            }
        }
    };

    render(){
        return (
            <Menu secondary>
                <Menu.Item>
                <Input type='text' placeholder='Search...' action>
                    <input
                        value={this.state.searchVal} 
                        onChange={this.handleOnChange}
                        onKeyDown={this.handleKeyDown} />
                    <Button 
                        type='submit' 
                        disabled={this.state.searchVal.length <= 2}
                        onClick={this.handleOnClick} >Search</Button>
                </Input>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <div>
                    <Button 
                        icon
                        size="small"
                        disabled={this.props.isShow} 
                        color={this.props.isShow? "grey":"green"}
                        onClick={this.props.clickAddPanel}>
                        <Icon name='add' />
                    </Button>    
                    </div>
                </Menu.Menu>
            </Menu>
        )
    }
};

ShippingAdviceSearch.propTypes = {
    isShow: PropTypes.bool,
    clickAddPanel: PropTypes.func,
    clickSearch: PropTypes.func,
};

export default ShippingAdviceSearch;



