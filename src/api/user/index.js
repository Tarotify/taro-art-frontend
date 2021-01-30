import { post } from '../../utils/request'

export function userRegBind(data) {
    const  url = 'user/signup/bind'
    return post(url,data)
}

export function getSession(data) {
    const  url = 'user/session'
    return post(url,data)
}

export function userVerifyAccount(data) {
    const  url = 'user/password/pre_reset'
    return post(url,data)
}

export function userPasswordReset(data) {
    const url = 'user/password/reset'
    return post(url,data)
}