import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login, password, name, surname, identNumber) => {
    const {data} = await $host.post('api/users/registration', {login, password, name, surname, identNumber})
    localStorage.setItem('token', data.token)
    return { user: jwt_decode(data.token), f2a: data.f2a }
}

export const login = async (identify, password) => {
    const {data} = await $host.post('api/users/login', {identify, password})
    localStorage.setItem('token', data.token)
    return  { user: jwt_decode(data.token), f2a: data.f2a }
}

export const check = async () => {
    const {data} = await $authHost.get('api/users/auth' )
    localStorage.setItem('token', data.token)
    return { user: jwt_decode(data.token), f2a: data.f2a }
}
 