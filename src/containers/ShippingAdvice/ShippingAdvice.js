import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dimmer, Loader, Grid, Segment, Menu, Table, Icon, Input } from 'semantic-ui-react';
import Notifications from 'react-notification-system-redux';
import ShippingAdviceItems from './ShippingAdviceItems/ShippingAdviceItems';
import ShippingAdviceForm from './ShippingAdviceForm/ShippingAdviceForm';
import ShippingAdviceSearch from './ShippingAdviceSearch/ShippingAdviceSearch';
import classes from './ShippingAdvice.css';
import * as actions from '../../store/actions/index';

class ShippingAdvice extends Component {

    state = {
        showAddPanel: false,
    };

    componentDidMount(){
        // this.props.onTryLoadDataFromCache();
        this.props.onFetchShipment('20180101','20181230');
    };

    handleClickCancel = (event) => {
        event.preventDefault();
        this.setState({showAddPanel: false });
    };

    handleClickSearch = (data) => {
        this.props.onFindShipment(data);
    };

    render(){
        let bodyTable = (
            <Table.Row>
                <Table.Cell colSpan='15'>
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                </Table.Cell>
            </Table.Row>
        );

        if (!this.props.loading && this.props.shipments){
            bodyTable = <ShippingAdviceItems items={this.props.shipments} />
        };

        let gridRow = (
            <Grid.Row>
                <Grid.Column>
                    <Segment className={classes.Segment}>
                        <div className={classes.GridRow}>
                            <ShippingAdviceForm clickCancel={this.handleClickCancel} />
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        );

        return (
            <div className={classes.ShippingAdvice}>
                <Notifications notifications={this.props.notifications} />
                <Grid columns='equal'>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment className={classes.Segment}>
                                <ShippingAdviceSearch 
                                    isShow={this.state.showAddPanel} 
                                    clickAddPanel={()=> { this.setState({showAddPanel: !this.showAddPanel})}} 
                                    clickSearch={this.handleClickSearch}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    { this.state.showAddPanel ? gridRow : null }
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
                                            <Table.HeaderCell rowSpan='2' className={classes.HeaderCell}>Info...</Table.HeaderCell>
                                            
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
                                    <Table.Body>
                                        { bodyTable }
                                    </Table.Body>
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
        shipments: state.shippingAdvExportAgent.items,
        loading: state.shippingAdvExportAgent.loading,
        error: state.shippingAdvExportAgent.fetchError,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShipment: (fromdate, todate) => dispatch(actions.fetchShippingAdvExport(fromdate, todate)),
        onFindShipment: (refno) => dispatch(actions.fetchShippingAdvExportByRef(refno)),
        onTryLoadDataFromCache: () => dispatch(actions.fetchShippingAdvExportFromCache())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdvice);