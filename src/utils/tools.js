import {Var} from './var'

export const Tools = {
    initGoogleAuth(callback) {
        if(typeof window.gapi === 'undefined') return
        const Gapi = window.gapi

        Gapi.load('auth2', function() {
            const res = Gapi.auth2.init({
                client_id: Var.goole_client_id
            })

            window.GooleAuth = res
            callback.call(this, res)
        })
    },

    initGithubAuth() {
        const scope = 'user:email,read:user'
        // 注意还是得在github设置callback地址
        const redirect_uri = 'http://localhost:3000/user/oauth/validating'
        return `https://github.com/login/oauth/authorize?client_id=${Var.github_client_id}&scope=${scope}&redirect_uri=${redirect_uri}`
    } 
}                                            