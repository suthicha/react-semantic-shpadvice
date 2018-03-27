import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    items: null,
    fetchError: null,
    execError: null,
    execStatus: '',
    loading: false,
    processing: false,
};

const fetchShippingAdvExportStart = (state, action) => {
    return updateObject(state, { loading: true, fetchError: null })
};

const fetchShippingAdvExportSuccess = (state, action) => {
    return updateObject(state, { loading: false, items: action.data })
};

const fetchShippingAdvExportFail = (state, action) => {
    return updateObject(state, { loading: false, fetchError: action.error })
};

const insertShippingAdvExportStart = (state, action) => {
    return updateObject(state, { processing: true,  execError: null })
};

const insertShippingAdvExportSuccess = (state, action) => {
    return updateObject(state, { processing: false, execStatus: 'OK'})
};

const insertShippingAdvExportFail = (state, action) => {
    return updateObject(state, { processing: false, execError: action.error, execStatus: 'FAIL' })
};

const updateShippingAdvExportStart = (state, action) => {
    return updateObject(state, { processing: true, execError: null })
};

const updateShippingAdvExportSuccess = (state, action) => {
    return updateObject(state, { processing: false, execStatus: 'OK' })
};

const updateShippingAdvExportFail = (state, action) => {
    return updateObject(state, { processing: false, execStatus: 'FAIL', execError: action.error })
};

const deleteShippingAdvExportStart = (state, action) => {
    return updateObject(state, { processing: true, execError: null })
};

const deleteShippingAdvExportSuccess = (state, action) => {
    return updateObject(state, { processing: false, execStatus: 'OK' })
};

const deleteShippingAdvExportFail = (state, action) => {
    return updateObject(state, { processing: false, execStatus: 'FAIL', execError: action.error })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHIPPINGADV_EXP_FETCH_START: return fetchShippingAdvExportStart(state, action);
        case actionTypes.SHIPPINGADV_EXP_FETCH_SUCCESS: return fetchShippingAdvExportSuccess(state, action);
        case actionTypes.SHIPPINGADV_EXP_FETCH_FAIL: return fetchShippingAdvExportFail(state, action);
        case actionTypes.SHIPPINGADV_EXP_INSERT_START: return insertShippingAdvExportStart(state, action);
        case actionTypes.SHIPPINGADV_EXP_INSERT_SUCCESS: return insertShippingAdvExportSuccess(state, action);
        case actionTypes.SHIPPINGADV_EXP_INSERT_FAIL: return insertShippingAdvExportFail(state, action);
        case actionTypes.SHIPPINGADV_EXP_UPDATE_START: return updateShippingAdvExportStart(state, action);
        case actionTypes.SHIPPINGADV_EXP_UPDATE_SUCCESS: return updateShippingAdvExportSuccess(state, action);
        case actionTypes.SHIPPINGADV_EXP_UPDATE_FAIL: return updateShippingAdvExportFail(state, action);
        case actionTypes.SHIPPINGADV_EXP_DELETE_START: return deleteShippingAdvExportStart(state, action);
        case actionTypes.SHIPPINGADV_EXP_DELETE_SUCCESS: return deleteShippingAdvExportSuccess(state, action);
        case actionTypes.SHIPPINGADV_EXP_DELETE_FAIL: return deleteShippingAdvExportFail(state, action);
        default:
            return state;
    }
};

export default reducer;
