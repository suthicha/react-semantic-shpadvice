import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Form, Button, Icon } from 'semantic-ui-react';
import InputField from '../../../components/UI/InputField/InputField';
import NumericInputField from '../../../components/UI/NumericInputField/NumericInputField';
import classes from './ShippingAdviceItemEdit.css';

class ShippingAdviceItemEdit extends Component {

    state = {
        trxno: 0,
        location: '',
        compcd: '',
        invno: '',
        tradcd: '',
        invdt: '',
        bldt: '',
        hawb: '',
        mawb: '',
        voy1: '',
        voy2: '',
        flt1: '',
        flt2: '',
        etd: '',
        eta: '',
        measurement: '0',
        muesureunit: 'CBM',
        port: '',
        shiptype: ''
    }

    bindPropsToState = () => {
        if (this.props.data) {
            
            const propKeys = Object.keys(this.props.data);
            const stateKeys = Object.keys(this.props);
      
            for(var i = 0; i < propKeys.length; i++){
                const keyname = propKeys[i].toLowerCase();
                const index = stateKeys.findIndex(q => q.toLowerCase() === keyname);
                if (index >= 0){
                    this.setState({[stateKeys[index]]: this.props.data[keyname]});
                }
            }

        }
    };

    componentDidMount() {
        this.bindPropsToState();
    }

    render(){
        const formClass = ['attached','fluid','segment', classes.Form];
        return (
            <Table.Row>
                <Table.Cell colSpan='16'>
                    <Form 
                        onSubmit={this.handlerSubmit} 
                        className={formClass.join(' ')}>
                        <Form.Group widths='equal'>
                            <Form.Field width="2">
                                <label>CMPCD</label>
                                <InputField 
                                    id="compcd"  
                                    maxLength={2}
                                    uppercase={true}
                                    value={this.state.compcd}
                                    ref={(ref) => this.__compcdField = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>LOCATION</label>
                                <InputField 
                                    id="location"  
                                    maxLength={1}
                                    uppercase={true}
                                    value={this.state.location}
                                    ref={(ref) => this.__locationField = ref} />
                            </Form.Field>
                            <Form.Field width="4" required>
                                <label>INVOICE NO.</label>
                                <InputField 
                                    id="invno"  
                                    maxLength={35}
                                    uppercase={true}
                                    value={this.state.invno}
                                    ref={(ref) => this.__invnoField = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>INV.DATE <small style={{color: 'red'}}>(YYYYMMDD)</small></label>
                                <InputField 
                                    id="invdt"
                                    type="number"  
                                    maxLength={8}
                                    value={this.state.invdt}
                                    ref={(ref) => this.__invdtField = ref} />
                            </Form.Field>
                            <Form.Field width="4">
                                <label style={{textAlign: 'right'}}>VOLUMN</label>
                                <NumericInputField 
                                    id="measurement" 
                                    value={this.state.measurement}
                                    ref={(ref) => this.__measurementField = ref} />
                                
                            </Form.Field>
                            <Form.Field width="2">
                                <label>UOM</label>
                                <InputField 
                                    id="muesureunit"  
                                    maxLength={6}
                                    uppercase={true}
                                    value={this.state.muesureunit}
                                    ref={(ref) => this.__muesureunitField = ref} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width="4">
                                <label>MAWB</label>
                                <InputField 
                                    id="mawb"  
                                    maxLength={35}
                                    uppercase={true}
                                    value={this.state.mawb}
                                    ref={(ref) => this.__mawbField = ref} />
                            </Form.Field>
                            <Form.Field width="4">
                                <label>HAWB</label>
                                <InputField 
                                    id="hawb"  
                                    maxLength={35}
                                    uppercase={true}
                                    value={this.state.hawb}
                                    ref={(ref) => this.__hawbField = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>BL.DATE <small style={{color: 'red'}}>(YYYYMMDD)</small></label>
                                <InputField 
                                    id="bldt"  
                                    type="number"
                                    maxLength={8}
                                    value={this.state.bldt}
                                    ref={(ref) => this.__bldtField = ref} />
                            </Form.Field>
                            <Form.Field width="6">
                                <label>PORT</label>
                                <InputField 
                                    id="port"  
                                    maxLength={20}
                                    uppercase={true}
                                    value={this.state.port}
                                    ref={(ref) => this.__portField = ref} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width="4">
                                <label>FLT#1</label>
                                <InputField 
                                    id="flt1"  
                                    maxLength={10}
                                    uppercase={true}
                                    value={this.state.flt1}
                                    ref={(ref) => this.__flt1Field = ref} />
                            </Form.Field>
                            <Form.Field width="4">
                                <label>FLT#2</label>
                                <InputField 
                                    id="flt2"  
                                    maxLength={10}
                                    uppercase={true}
                                    value={this.state.flt2}
                                    ref={(ref) => this.__flt2Field = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>ETD <small style={{color: 'red'}}>(YYYYMMDD)</small></label>
                                <InputField 
                                    id="etd"  
                                    type="number"
                                    maxLength={8}
                                    value={this.state.etd}
                                    ref={(ref) => this.__etdField = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>ETA <small style={{color: 'red'}}>(YYYYMMDD)</small></label>
                                <InputField 
                                    id="eta"  
                                    type="number"
                                    maxLength={8}
                                    value={this.state.eta}
                                    ref={(ref) => this.__etaField = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>TRAD.</label>
                                <InputField 
                                    id="tradcd"  
                                    maxLength={8}
                                    uppercase={true}
                                    value={this.state.tradcd}
                                    ref={(ref) => this.__tradcdField = ref} />
                            </Form.Field>
                            <Form.Field width="2">
                                <label>SHIPTYPE</label>
                                <InputField 
                                    id="shiptype"  
                                    maxLength={1}
                                    uppercase={true}
                                    value={this.state.shiptype}
                                    ref={(ref) => this.__shiptypeField = ref} />
                            </Form.Field>
                        </Form.Group>
                        <Button 
                            icon
                            type="submit" 
                            color="green"
                            loading={this.props.loading}>
                            <Icon name="send outline" />
                            Update
                        </Button>
                        <Button 
                            icon
                            type="cancel" 
                            onClick={this.props.clickCancel}>
                            <Icon name="close" />
                            Cancel
                        </Button>
                        
                    </Form>
                </Table.Cell>
            </Table.Row>
        )
    }
};

ShippingAdviceItemEdit.propTypes = {
    data: PropTypes.object
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdviceItemEdit);