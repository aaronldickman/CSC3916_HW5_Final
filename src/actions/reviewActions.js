import runtimeEnv from'@mars/heroku-js-runtime-env';
import consts from '../constants/consts'

export function submitReview(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api_version': consts.API_VERSION,
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                console.log("review submitted");
            })
            .catch( (e) => {
                console.log(e)
            } );
    }
}