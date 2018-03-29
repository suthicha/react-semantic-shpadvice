import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Form, Button, Icon } from 'semantic-ui-react';
import InputField from '../../../components/UI/InputField/InputField';
import NumericInputField from '../../../components/UI/NumericInputField/NumericInputField';
import * as actions from '../../../store/actions';
import { warningAlert } from '../../../store/actions/notificationAction';
import classes from './ShippingAdviceForm.css';

class ShippingAdviceForm extends Component {

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

    componentDidMount(){
        this.bindPropsToState();
    };

    componentWillReceiveProps(nextProps){

        if (!nextProps.loading && nextProps.success){
            _.delay(()=>{

                const keys = Object.keys(this);        
                for(var i = 0; i < keys.length; i++){
                    if (keys[i].indexOf('Field') >= 0){
                        try{
                        this[keys[i]].updateValue('');
                        }catch(e){}
                    }
                }
                this.__measurementField.updateValue('0');
                this.__muesureunitField.updateValue('CBM');

            }, 200);
            
        }

    };

    render(){
        const formClass = ['attached','fluid','segment', classes.Form];

        return (
            <div className={classes.ShippingAdviceForm}>
                <Message 
                    attached
                    icon="database"
                    header="Shipment Information"
                    content="Fill out the form below to send data transfer."
                />
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
                        Send data Transfer
                    </Button>
                    <Button 
                        icon
                        type="cancel" 
                        color="orange"
                        floated="right"
                        onClick={this.props.clickCancel}>
                        <Icon name="close" />
                        Cancel
                    </Button>
                    
                </Form>
            </div>
        );
    };

    handlerSubmit = () => {
        const invno = this.__invnoField.getValue();

        if (invno.value === ""){
            this.context.store.dispatch(warningAlert(
                'validate',
                'please enter invoice no.'
            ))
           return;
        }else {
            let data = {};
            const keys = Object.keys(this);        
            for(var i = 0; i < keys.length; i++){
                if (keys[i].indexOf('__') >= 0){
                    try {
                        const control = this[keys[i]].getProps();
                        data[control.id]=control.value;
                    }catch(e){}
                }
            }
    
            this.props.onInsertShippingAdv(data);
        }

    };
};


const mapStateToProps = state => {
    return {
        loading: state.shippingAdvExportAgent.processing,
        error: state.shippingAdvExportAgent.execError,
        success: state.shippingAdvExportAgent.execStatus === 'OK'? true : false,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInsertShippingAdv: (data) => dispatch(actions.insertShippingAdvExport(data))
    }
};

ShippingAdviceForm.propTypes = {
    clickCancel: PropTypes.func,
}

ShippingAdviceForm.contextTypes={
    store: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAdviceForm);
