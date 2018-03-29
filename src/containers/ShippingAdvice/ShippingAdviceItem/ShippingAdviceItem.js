import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Icon } from 'semantic-ui-react';
import classes from './ShippingAdviceItem.css'
import ShippingAdviceItemEdit from '../ShippingAdviceItemEdit/ShippingAdviceItemEdit';
import Aux from '../../../hoc/Aux/Aux';

class ShippingAdviceItem extends Component {
    state = {
        isEdit: false,
    };

    handleClickItemEdit = () => {
        this.setState({isEdit: !this.state.isEdit });
    };

    render(){
        const { data } = this.props;
        let editRow = null;
        let rowClasses = [classes.Row];

        if (this.state.isEdit){
            editRow = <ShippingAdviceItemEdit />
            rowClasses = [classes.Row, classes.RowEdit];
        }

        let row = (
            <Aux>
                <Table.Row className={rowClasses.join(' ')}>
                    <Table.Cell className={classes.Center}>{data.Location}</Table.Cell>
                    <Table.Cell className={classes.Center}>{data.TradCd}</Table.Cell>
                    <Table.Cell>{data.Mawb}</Table.Cell>
                    <Table.Cell>{data.Hawb}</Table.Cell>
                    <Table.Cell>{data.InvNo}</Table.Cell>
                    <Table.Cell>{data.InvDt}</Table.Cell>
                    <Table.Cell className={classes.Number}>{data.Measurement.toFixed(3)}</Table.Cell>
                    <Table.Cell>{data.MuesureUnit}</Table.Cell>
                    <Table.Cell>{data.Port}</Table.Cell>
                    <Table.Cell>{data.BlDt}</Table.Cell>
                    <Table.Cell>{data.Etd}</Table.Cell>
                    <Table.Cell>{data.Eta}</Table.Cell>
                    <Table.Cell>{data.SendDate}</Table.Cell>
                    <Table.Cell>{data.SendTime}</Table.Cell>
                    <Table.Cell>{data.UPDATEBY}</Table.Cell>
                    <Table.Cell>
                        <Button 
                            icon 
                            color={this.state.isEdit? 'orange': 'twitter'} 
                            onClick={this.handleClickItemEdit}>
                            <Icon 
                                name={this.state.isEdit?'folder open outline':'folder outline'} 
                                color="white" />
                        </Button>
                    </Table.Cell>                
                </Table.Row>
                { editRow }
            </Aux>
        );

        return row;
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
    data: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdviceItem);