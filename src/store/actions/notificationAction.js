import { success, warning, error, removeAll } from 'react-notification-system-redux';

export const removeAlert = () => {
    return removeAll();
}

export const successAlert = (title, message) => {
    return success({
        title: title.toUpperCase(),
        message: message.toUpperCase(),
        position: 'br',
        autoDismiss: 2
    });
};

export const warningAlert = (title, message, position) => {
    return warning({
        title: title.toUpperCase(),
        message: message.toUpperCase(),
        position: position? position:'br',
        autoDismiss: 2
    });
};

export const errorAlert = (title, err) => {
    return error({
        title: title.toUpperCase(),
        message: err.response.status + ':' + err.response.statusText + ',' + err.response.data.message,
        position: 'br',
        autoDismiss: 0
    });
};