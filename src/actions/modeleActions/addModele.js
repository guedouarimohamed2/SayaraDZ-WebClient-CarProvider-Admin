var request = require('./../api/service');

export function addModele(nom, url,code,opts,cols) {
    let body={
        "nom": nom,
        "url": url,
        "code": code,
        "id_marque": localStorage.id_marque,
        "options": opts,
        "couleurs": cols,
    };

    let head= {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            'cache-control': 'no-cache'
        }
    };
    return dispatch =>{
        request.post('/modeles', body, head)
            .then(function (response) {
                dispatch({type : 'ADD_MODELE', payload: response});
            })
            .catch(function (error) {
                dispatch(err(error));
                console.log(error);
                alert("Erreur : le code existe déja ou la connexion est interrompu")
            });
    }
}
export const err = (error) => ({
    type: "ERROR_GET",
    payload: error
});