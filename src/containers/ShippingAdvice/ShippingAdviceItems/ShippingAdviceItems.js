import React from 'react';
import PropTypes from 'prop-types';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import ShippingAdviceItem from '../ShippingAdviceItem/ShippingAdviceItem';

const shippingAdviceItems = props => {
    if(!props.items){
        return (
            <Table.Row>
                <Table.Cell colSpan='16'>
                    <h2>Find not found...</h2>
                </Table.Cell>
            </Table.Row>
        );
    }
    
    const rows = props.items.map((data, index) => {
        return <ShippingAdviceItem key={index} data={data} />;
    });

    return rows;
};

shippingAdviceItems.propTypes = {
    items: PropTypes.array
};

export default shippingAdviceItems;