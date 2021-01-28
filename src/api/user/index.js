import { post } from '../../utils/request'

export function userRegBind(data) {
    const  url = 'user/signup/bind'
    return post(url,data)
}

export function getSession(data) {
    const  url = 'user/session'
    return post(url,data)
}