import { get, post } from '../../utils/request'

export function testGet(param) {
    const  url = 'common/test'
    return get(
        url,
        param
    )
}

export function githubCodeAuth(data) {
    const  url = 'oauth/github/codeAuth'
    return post(
        url,
        data
    )
}


export function userGoogleAuth(data) {
    const url = 'oauth/google/tokenAuth'
    return post(
        url,
        data
    )
}