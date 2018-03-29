import * as actionType from './actionTypes';
import axios from '../../axios-local';
import { promiseTimeout, guid, randomNumber } from '../../shared/utility';
import { successAlert, errorAlert, warningAlert } from './notificationAction';

export const updateUserStart = () => {
    return { type: actionType.USER_UPDATE_START }
};

export const updateUserSuccess = () => {
    return { type: actionType.USER_UPDATE_SUCCESS}
};

export const updateUserFail = (error) => {
    return { type: actionType.USER_UPDATE_FAIL, error: error }
};

export const selectUserStart = () => {
    return { type: actionType.USER_SELECT_START}
};

export const selectUserSuccess = (users) => {
    return { 
        type: actionType.USER_SELECT_SUCCESS,
        users: users
    }
};

export const selectUserFail = (error) => {
    return {
        type: actionType.USER_SELECT_FAIL,
        error: error
    }
};

export const resetUserPasswordStart = () => {
    return { type: actionType.USER_RESET_PASSWORD_START }
};

export const resetUserPasswordSuccess = () => {
    return { type: actionType.USER_RESET_PASSWORD_SUCCESS }
};

export const resetUserPasswordFail = (error) => {
    return { 
        type: actionType.USER_RESET_PASSWORD_FAIL,
        error: error
    }
};

export const adminUpdateUserStart = () => {
    return { type: actionType.ADMIN_UPDATE_USER_START }
};

export const adminUpdateUserSuccess = (user) => {
    return { 
        type: actionType.ADMIN_UPDATE_USER_SUCCESS,
        user: user
    }
};

export const adminUpdateUserFail = (error) => {
    return {
        type: actionType.ADMIN_UPDATE_USER_FAIL,
        error: error
    }
};

export const adminDeleteUserStart = () => {
    return { type: actionType.ADMIN_DELETE_USER_START }
};

export const adminDeleteUserSuccess = () => {
    return { type: actionType.ADMIN_DELETE_USER_SUCCESS }
};

export const adminDeleteUserFail = (error) => {
    return { 
        type: actionType.ADMIN_DELETE_USER_FAIL,
        error: error
    }
};

export const adminInsertUserStart = () => {
    return { type: actionType.ADMIN_INSERT_USER_START }
};

export const adminInsertUserSuccess = () => {
    return { type: actionType.ADMIN_INSERT_USER_SUCCESS }
};

export const adminInsertUserFail = (error) => {
    return { type: actionType.ADMIN_INSERT_USER_FAIL, error: error }
};

export const updateUser = (user) => {
    return dispatch => {
        dispatch(updateUserStart());
        const userId = localStorage.getItem('userId');
        const groupId = localStorage.getItem('groupId');
        const token = localStorage.getItem('token');

        const userData = {
            ...user,
            UserID: userId,
            UserGroupID: groupId
        };

        dispatch({type: actionType.SETTINGS_LOAD_SUCCESS, user: userData})

        const promise = promiseTimeout(500, axios.post(`/user/${userId}?token=${token}`, userData));

        promise.then(res => {
            dispatch(successAlert('Account Settings', 'Update your account success.'));
            dispatch(updateUserSuccess());
        })
        .catch(err => {
            dispatch(errorAlert('Account Settings', err));
            dispatch(updateUserFail(err));
        })
    }
};

export const selectUsers = () => {
    return dispatch => {
        dispatch(selectUserStart());

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const promise = promiseTimeout(500, axios.get(`/user/all/${userId}?token=${token}`));
        promise.then(res => {

            localStorage.setItem('users', JSON.stringify(res.data.users));
            dispatch(successAlert('USERS', 'Found users list success.'));
            dispatch(selectUserSuccess(res.data.users));
        })
        .catch(err => {
            dispatch(errorAlert('USERS', err));
            dispatch(selectUserFail(err));
        });
    }
};

export const resetUserPassword = (userId, newPassword) => {
    return dispatch => {
        dispatch(resetUserPasswordStart());
        const data = {
            UserID: userId,
            NewPassword: newPassword
        };

        const token = localStorage.getItem('token');
        const promise = promiseTimeout(500, axios.patch(`/user/recovery?token=${token}`, data));

        promise.then(res => {
            dispatch(successAlert('Reset Password', 'Reset password userId '+ userId + ' success.'));
            dispatch(resetUserPasswordSuccess());
        })
        .catch(err => {
            dispatch(errorAlert('Reset Password', err));
            dispatch(resetUserPasswordFail(err));
        });
    }
};

export const updateUserByRef = (user) => {
    return dispatch => {
        dispatch(adminUpdateUserStart());
        const token = localStorage.getItem('token');
        const promise = promiseTimeout(500, axios.post(`/user/${user.UserID}?token=${token}`, user));

        let users = JSON.parse(localStorage.getItem('users'));
        const index = users.findIndex(q => q.UserID === user.UserID);
            
        promise.then(res => {

            if (index >= 0){
                const updateUser = {...users[index], ...user};
                updateUser.error = null;
                users[index] = updateUser;
            }

            localStorage.setItem('users', JSON.stringify(users));
            dispatch(successAlert('Update User', 'Update user '+ user.LoginName + ' success.'));
            dispatch(adminUpdateUserSuccess(null));
            dispatch(selectUserSuccess(users));

        })
        .catch(err => {

            if (index >= 0){
                const oldUser = users[index];
                const updateUser = {...users[index], 
                    ...user, 
                    oldValue: {...oldUser},
                    error: err};
                users[index] = updateUser;
            }

            localStorage.setItem('users', JSON.stringify(users));
            dispatch(errorAlert('Update User', err));
            dispatch(adminUpdateUserFail(err));
        });
    }
};

export const deleteUserByRef = (user) => {
    return dispatch => {
        dispatch(adminDeleteUserStart());
        const { UserID, LoginName } = user;
        const token = localStorage.getItem('token');
        let users = JSON.parse(localStorage.getItem('users'));

        
        if (user.itemType){
            const filterUsers = users.filter(q => q.UserID !== UserID);
            localStorage.setItem('users', JSON.stringify(filterUsers));
            dispatch(warningAlert('Delete User', 'Delete user '+ LoginName + ' success.'));
            dispatch(adminDeleteUserSuccess());
            dispatch(selectUserSuccess(filterUsers));

        }else {
            const promise = promiseTimeout(500, axios.delete(`/user/${UserID}?token=${token}`));
            promise.then(res => {

                const filterUsers = users.filter(q => q.UserID !== UserID);
                localStorage.setItem('users', JSON.stringify(filterUsers));
                dispatch(warningAlert('Delete User', 'Delete user '+ LoginName + ' success.'));
                dispatch(adminDeleteUserSuccess());
                dispatch(selectUserSuccess(filterUsers));

            })
            .catch(err => {
                dispatch(errorAlert('Delete User', err));
                dispatch(adminDeleteUserFail(err));
            })
        }
    };
};

export const insertUserByRef = (user) => {
    return dispatch => {
        dispatch(adminInsertUserStart());
        const promise = promiseTimeout(500, axios.post(`/user/signup`, user));
        
        let users = JSON.parse(localStorage.getItem('users'));
        const index = users.findIndex(q => q.UserID === user.UserID);

        promise.then(res => {

            if (index >= 0){
                const updateUser = {...users[index], ...res.data.users[0], ItemType: null};
                users[index] = updateUser;
            }

            localStorage.setItem('users', JSON.stringify(users));
            dispatch(successAlert('Add User','Account name '+ user.LoginName +' was registered.'));
            dispatch(adminInsertUserSuccess());
            dispatch(selectUserSuccess(users));
        })
        .catch(err => {
            if (index >= 0){
                const updateUser = {...users[index], ...user, ItemType: 'NEW', error: err};
                users[index] = updateUser;
            }
            localStorage.setItem('users', JSON.stringify(users));
            dispatch(errorAlert('Add User', err));
            dispatch(adminInsertUserFail(err));
            dispatch(selectUserSuccess(users));
        });
    }
};


export const addUserItem = () => {
    return dispatch => {
        let users = JSON.parse(localStorage.getItem('users'));
        const user = {
            UserID: randomNumber() * -1,
            LoginName: '',
            Password: '',
            FirstName: '',
            LastName: '',
            Email: '',
            PhoneNO: '',
            UserGroupID: 1,
            ItemType: 'NEW',
            RefKey: guid(),
            error: null
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        dispatch(selectUserSuccess(users));
        dispatch(successAlert('Add User', 'Add user item is done.'));
    }
};

export const fetchUsersFromCache = (refkey) => {
    return dispatch => {
        let users = JSON.parse(localStorage.getItem('users'));

        for(var i=0; i < users.length;i++){
            if (users[i].oldValue){
                const oldValue = users[i].oldValue;
                const fields = Object.keys(oldValue);
                for(var j=0; j < fields.length; j++){
                    const fieldName = fields[j];
                    users[i][fieldName]= oldValue[fieldName];
                }
                users[i].oldValue=null;
                users[i].error=null;
                users[i].triggerValue = true;
            }
        };

        const index = users.findIndex(q=> q.ItemType === 'NEW' && q.RefKey === refkey);
        if (index >= 0){
            users.splice(index,1);
            dispatch(warningAlert('Removed', 'Cancel your new account.'));
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        dispatch(selectUserSuccess(users));
    }
};
