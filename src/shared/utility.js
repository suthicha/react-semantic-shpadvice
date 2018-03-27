export const promiseTimeout = (ms, promise) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            promise.then(resp => { resolve(resp)}).catch(err => { reject(err)});
        },ms);
    })
};

export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    };
};

export const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};