import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Grid, Segment, Table } from 'semantic-ui-react';
import Notifications from 'react-notification-system-redux';
import ShippingAdviceItems from './ShippingAdviceItems/ShippingAdviceItems';
import ShippingAdviceForm from './ShippingAdviceForm/ShippingAdviceForm';
import classes from './ShippingAdvice.css';

class ShippingAdvice extends Component {

    componentDidMount(){

    };

    render(){
        return (
            <div className={classes.ShippingAdvice}>
                <Grid columns='equal'>
                    {/* <Grid.Row stretched>
                        <Grid.Column>
                            <Segment className={classes.Segment}>
                                <h2>search bar.</h2>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row> */}
                    <Grid.Row>
                        <Grid.Column>
                            <Segment className={classes.Segment}>
                                <div>
                                    <ShippingAdviceForm />
                                </div>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                            <Segment className={classes.Segment}>
                                <Table color={'red'} size="small" celled selectable>
                                    <Table.Header>
                                        <Table.Row style={{textAlign: 'center'}}>
                                            <Table.HeaderCell rowSpan='2' className={classes.HeaderCell}>Location</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2' className={classes.HeaderCell}>Trans.</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2' className={classes.HeaderCell}>Mawb</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2' className={classes.HeaderCell}>Hawb</Table.HeaderCell>
                                            <Table.HeaderCell colSpan='2' className={classes.HeaderCell}>Invoice</Table.HeaderCell>
                                            <Table.HeaderCell colSpan='2' className={classes.HeaderCell}>Measurement</Table.HeaderCell>
                                            <Table.HeaderCell rowSpan='2' className={classes.HeaderCell}>Port</Table.HeaderCell>
                                            <Table.HeaderCell colSpan='3' className={classes.HeaderCell}>Date</Table.HeaderCell>
                                            <Table.HeaderCell colSpan='3' className={classes.HeaderCell}>Send</Table.HeaderCell>
                                        </Table.Row>
                                        <Table.Row style={{textAlign: 'center'}}>
                                            <Table.HeaderCell className={classes.TrFirstChild}>No.</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>Date</Table.HeaderCell>                               
                                            <Table.HeaderCell className={classes.ScendCell}>Qty.</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>Uom</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>BL.</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>ETD.</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>ETA</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>Date</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>Time</Table.HeaderCell>
                                            <Table.HeaderCell className={classes.ScendCell}>By</Table.HeaderCell>                                            
                                        </Table.Row>
                                    </Table.Header>
                                </Table>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        notifications: state.notifications,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdvice);