import _ from 'lodash';
import * as actionTypes from './actionTypes';
import { successAlert, errorAlert } from './notificationAction';
import { promiseTimeout } from '../../shared/utility';
import axios from '../../axios-local';

export const fetchShippingAdvExportStart = () => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_FETCH_START
    }
};
export const fetchShippingAdvExportSuccess = (data) => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_FETCH_SUCCESS,
        data: data,
    }
};

export const fetchShippingAdvExportFail = (error) => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_FETCH_FAIL,
        error: error,
    }
};

export const insertShippingAdvExportStart = () => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_INSERT_START
    }
};

export const insertShippingAdvExportSuccess = () => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_INSERT_SUCCESS
    }
};

export const insertShippingAdvExportFail = (error) => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_INSERT_FAIL,
        error: error,
    }
};

export const updateShippingAdvExportStart = () => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_UPDATE_START,
    }
};

export const updateShippingAdvExportSuccess = () => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_UPDATE_SUCCESS
    }
};

export const updateShippingAdvExportFail = (error) => {
    return {
        type: actionTypes.SHIPPINGADV_EXP_UPDATE_FAIL,
        error: error,
    }
};

export const deleteShippingAdvExportStart = () => {
    return { type: actionTypes.SHIPPINGADV_EXP_DELETE_START }
};

export const deleteShippingAdvExportSuccess = () => {
    return { type: actionTypes.SHIPPINGADV_EXP_DELETE_SUCCESS }
};

export const deleteShippingAdvExportFail = (error) => {
    return { 
        type: actionTypes.SHIPPINGADV_EXP_DELETE_FAIL,
        error: error
    }
};

export const fetchShippingAdvExport = (fromdate, todate) => {
    return dispatch => {
        dispatch(fetchShippingAdvExportStart());
        const token = localStorage.getItem('token');

        const promise = promiseTimeout(500, axios.get(`/shipment/${fromdate}/${todate}?token=${token}`));

        promise.then(res => {
            localStorage.setItem('shipExports', JSON.stringify(res.data.shipments));
            dispatch(fetchShippingAdvExportSuccess(res.data.shipments));
            dispatch(successAlert('fetch shipping advice', 'found data '+ res.data.shipments.length + ' rec.'));
        })
        .catch(err => {
            dispatch(fetchShippingAdvExportFail(err));
            dispatch(errorAlert('fetch shipping advice', err));
        })
    }
};

export const fetchShippingAdvExportByRef = (refno) => {
    return dispatch => {
        dispatch(fetchShippingAdvExportStart());
        const token = localStorage.getItem('token');

        const promise = promiseTimeout(500, axios.get(`/shipment/${refno}?token=${token}`));

        promise.then(res => {
            localStorage.setItem('shipExports', JSON.stringify(res.data.shipments));
            dispatch(fetchShippingAdvExportSuccess(res.data.shipments));
            dispatch(successAlert('fetch shipping advice', 'found data '+ res.data.shipments.length + ' rec.'));
        })
        .catch(err => {
            dispatch(fetchShippingAdvExportFail(err));
            dispatch(errorAlert('fetch shipping advice', err));
        })
    }
};


export const fetchShippingAdvExportFromCache = () => {
    return dispatch => {
        dispatch(fetchShippingAdvExportStart());
        try{
            setTimeout(()=>{
                const shipexportCache = JSON.parse(localStorage.getItem('shipExports'));
                dispatch(fetchShippingAdvExportSuccess(shipexportCache));
                dispatch(successAlert('fetch shippinf advice', 'load from cache success.'));
    
            },500);
            
        }catch(e){}
    }
};

export const insertShippingAdvExport = (data) => {
    return dispatch => {
        dispatch(insertShippingAdvExportStart());

        const token = localStorage.getItem('token');
        const newShip = fillShipment(data);
        const promise = promiseTimeout(500, axios.put(`/shipment?token=${token}`, newShip));

        promise.then(res => {
            
            try{

                const shipexportCache = localStorage.getItem('shipExports');
                let shipExports = [];
                
                if (shipexportCache){
                    shipExports = JSON.parse(shipexportCache);
                };

                let shipmentItem = null;
                if (res.data.shipments && res.data.shipments.length > 0){
                    shipmentItem = {...res.data.shipments[0]};
                    shipExports.push(shipmentItem);            
                }
        
                const sortShipExport = _.orderBy(shipExports, ['TrxNo'],['desc'])

                localStorage.setItem('shipExports', JSON.stringify(sortShipExport));
                dispatch(insertShippingAdvExportSuccess());
                dispatch(successAlert('insert shipping advice', 'create success.'))
                dispatch(fetchShippingAdvExportSuccess(sortShipExport));

            }catch(e){}

        })
        .catch(err => {
            dispatch(insertShippingAdvExportFail(err));
            dispatch(errorAlert('insert shipping advice', err));
        })
    }
};

export const updateShippingAdvExport = (data) => {
    return dispatch => {
        dispatch(updateShippingAdvExportStart());

        const token = localStorage.getItem('token');
        const shipment = fillShipment(data);

        const shipexportCache = JSON.parse(localStorage.getItem('shipExports'));
        const index = shipexportCache.findIndex(q => q.TrxNo === data.TrxNo);
                
        const promise = promiseTimeout(500, axios.patch(`/shipment?token=${token}`, shipment));

        promise.then(res => {

            try{
                
                if (index >= 0){
                    const updateShipmentItem = {
                        ...shipexportCache[index], 
                        ...res.data.shipments[0]}
                    updateShipmentItem.error = null;
                    shipexportCache[index]=updateShipmentItem;
                }

                localStorage.setItem('shipExports', JSON.stringify(shipexportCache));
                dispatch(updateShippingAdvExportSuccess());
                dispatch(successAlert('update shipping advince', 'update invoice no.' + data.invno + ' success.'));
                dispatch(fetchShippingAdvExportSuccess(shipexportCache));
                
            }catch(e){}

        })
        .catch(err => {

            if (index >= 0){
                const oldShipmentItem = shipexportCache[index];
                const updateShipmentItem = {
                    ...shipexportCache[index],
                    ...shipment,
                    oldValue: {...oldShipmentItem },
                    error: err
                };
                shipexportCache[index]=updateShipmentItem;
            }
            localStorage.setItem('shipExports', JSON.stringify(shipexportCache));
            dispatch(updateShippingAdvExportFail(err));
            dispatch(errorAlert('update shipping advince', err));
            dispatch(fetchShippingAdvExportSuccess(shipexportCache));
        });
    }
};

export const deleteShippingAdvExport = (data) => {
    return dispatch => {
        dispatch(deleteShippingAdvExportStart());

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const shipment = fillShipment(data);
        const shipexportCache = JSON.parse(localStorage.getItem('shipExports'));
        const index = shipexportCache.findIndex(q => q.TrxNo === data.TrxNo);
        const promise = promiseTimeout(500, axios.delete(`/shipment/${data.TrxNo}/${userId}?token=${token}`));

        promise.then(res => {
            const updateShipExportCache = shipexportCache.filter(q => q.TrxNo !== data.TrxNo);
            localStorage.setItem('shipExports', JSON.stringify(updateShipExportCache));
            dispatch(deleteShippingAdvExportSuccess());
            dispatch(successAlert('delete shipping advice', 'delete success.'));
            dispatch(fetchShippingAdvExportSuccess(updateShipExportCache));            
        })
        .catch(err => {

            if (index >= 0){
                const oldShipmentItem = shipexportCache[index];
                const updateShipmentItem = {
                    ...shipexportCache[index],
                    ...shipment,
                    oldValue: {...oldShipmentItem },
                    error: err
                };
                shipexportCache[index]=updateShipmentItem;
            }

            localStorage.setItem('shipExports', JSON.stringify(shipexportCache));
            dispatch(deleteShippingAdvExportFail(err));
            dispatch(errorAlert('delete shipping advince', err));
            dispatch(fetchShippingAdvExportSuccess(shipexportCache));            
        })
    }
};

export const fillShipment = (data) => {
    const userId = localStorage.getItem('userId');
    return {
            TrxNo: data.TrxNo,
            Location: data.location,
            CompCd: data.compcd,
            InvNo: data.invno,
            TradCd: data.tradcd,
            InvDt: data.invdt,
            BlDt: data.bldt,
            Hawb: data.hawb,
            Mawb: data.mawb,
            Voy1: data.voy1,
            Voy2: data.voy3,
            Flt1: data.flt1,
            Flt2: data.flt2,
            Etd: data.etd,
            Eta: data.eta,
            Measurement: data.measurement,
            MuesureUnit: data.muesureunit,
            Agent: data.agent,
            Port: data.port,
            Resend: data.resend,
            UpdateBy: userId,
            Shiptype: data.shiptype
    }
};