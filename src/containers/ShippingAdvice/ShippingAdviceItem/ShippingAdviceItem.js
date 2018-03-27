import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ShippingAdviceItem extends Component {

    render(){
        return (
            <h2>Items...</h2>
        );
    }
};


const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

ShippingAdviceItem.propTypes = {
    data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdviceItem);