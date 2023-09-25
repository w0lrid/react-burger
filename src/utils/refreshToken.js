import {checkResponse} from "./checkResponse";

export const refreshToken = () => {
    return fetch('https://norma.nomoreparties.space/api/auth/token', {
        method: 'POST',
        body: JSON.stringify(localStorage.getItem('refreshToken'))
    })
        .then(checkResponse)
        .then((response) => response)
        .catch(() => {
            console.error('something went wrong')
        })
}