import { deleteCookie, getCookie, setCookie } from "./cookies";

const baseUrl = 'https://norma.nomoreparties.space/api'

export const request = async (url, options) => {
    const res = await fetch(url, options)
    return checkResponse(res)
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

export const refreshToken = () => {
    const url = `${baseUrl}/auth/token`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: getCookie('refresh')
        })
    };
    request(url, options)
        .then(({ success, accessToken }) => {

            if (success) {
                deleteCookie('access');
                setCookie('access', accessToken);
            }
        })
        .catch(console.warn)
}


export const generateKey = (element, index) => {
    return `${element._id}${index}`
}

export const filterIngredients = (arr, data) => arr.map(item => {
    return data.filter(i => i._id === item);
}).reduce((acc, item) => {
    return acc.concat(item)
}).map((item, index) => ({ ...item, key: generateKey(item, index) }))

export const calculatePrice = (arr, data) => {
    return filterIngredients(arr, data).reduce((acc, item) => acc + item.price, 0)
}

export const includesIngredients = (data, arr) => {
    return data.filter((item) => arr.includes(item._id));
}

export const getOrderDate = (date) => {
    const options = {
        month: 'long',
        day: 'numeric',
        timezone: 'Moscow',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: "short",
    };

    return new Date(Date.parse(date)).toLocaleString("ru", options)
}