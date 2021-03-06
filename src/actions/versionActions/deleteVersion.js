var request = require('./../api/service');

export function deleteVersion(id) {
    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };

    return dispatch =>{
        dispatch(begin());
        request.delete('/versions/'+id, head)
            .then(function (response) {
                dispatch(end(id));
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
            });
    }
}

export const begin = () => ({
    type: "BEGIN_DELETE_VERSION",
});


export const end = (id) => ({
    type: "END_DELETE_VERSION",
    id
});

export const err = (error) => ({
    type: "ERROR_DELETE_VERSION",
    payload: error
});