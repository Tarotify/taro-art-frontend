import { Var } from './var'
import { createFromIconfontCN } from '@ant-design/icons'


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1314504_emrrz3smvca.js' // 在 iconfont.cn上生成
})


export const Tools = {
    // <IconFont type="XXX"/>
    getIcons() {
        return IconFont
    },
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
    }, 

    setToken(cvalue, cname='__TaroToken__', exdays=7) {
        const d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        const expires = "expires="+d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires;
    },

    getToken(cname='__TaroToken__') {
        const name = cname + "=";
        let cookiesArr = document.cookie.split(';');
        for(let i=0; i<cookiesArr.length; i++) {
            const c = cookiesArr[i].trim();
            if (c.indexOf(name)===0) { return c.substring(name.length,c.length); }
        }
        return "";
    },

    userLogout() {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie=`__TaroToken__=;expires=${exp.toGMTString()};Domain=localhost;`;
    }
}   

export const Storage = {
    /**
     * 因为直接用atob会导致汉字乱码，
     * btoa它来解码的时候数据不对
     * encodeURIComponent 先把数据转换一次，把汉字转译 再btoa加密
     * decodeURIComponent 把转译的数据转回来，就解决了atob 方法汉字乱码问题
     * 加密数据
     * @param {any} data 转为base64数据
     */
    encrypt(data){
        let set = encodeURIComponent(data)
        let result = btoa(set);
        return result;
    },
    /**
     * 解码数据
     * @param {any} data 数据
     */
    decrypt(data){
        let decrypt_layer1 = atob(data)
        let result = decodeURIComponent(decrypt_layer1);
        return result;
    },

    /**
     * 判断该当前的key 是否存在
     * @param key
     * @constructor
     */
    ISKET(key){
        if(!key){
            throw Error('请传入Session的KEY!!!')
        }
    },
    /**
     * Session存储方法
     * @param key 存储的key值
     * @param setObj 存储的数据
     */
    setSession(key,setObj){
        this.ISKET(key);
        if(Object.keys(setObj).length > 0){
            setObj = JSON.stringify(setObj);
        }
        sessionStorage.setItem(this.encrypt(key),this.encrypt(setObj));
    },
    /**
     * Local存储方法
     */
    setLocal(key,setObj){
        this.ISKET(key);
        if(Object.keys(setObj).length > 0){
            setObj = JSON.stringify(setObj);
        }
        localStorage.setItem(this.encrypt(key),this.encrypt(setObj));
    },
    /**
     * 获取存储的值
     * @param key 存储的key
     * @returns {any} 返回对应的key 的数据
     */
    getSession(key){
        this.ISKET(key);
        let data = sessionStorage.getItem(this.encrypt(key));
        if(data){
            try{
                return  JSON.parse(this.decrypt(data))
            }catch(e){
                console.error('getSession方法获取数据错误');
                return false
            }
        }else{
            return null
        }
    },
    getLocal(key){
        this.ISKET(key);
        let data = localStorage.getItem(this.encrypt(key));
        if(data){
            try{
                return  JSON.parse(this.decrypt(data))
            }catch(e){
                console.error('getLocal方法获取数据错误');
                return false
            }
        }else{
            return null
        }
    },
    sessionClear(key){
        this.ISKET(key);
        sessionStorage.removeItem()(key)
    },
    localClear(key){
        this.ISKET(key);
        localStorage.removeItem()(key)
    },
    sessionClearAll(){
        sessionStorage.clear();
    },

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        const expires = "expires="+d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires;
    },

    getCookie(cname) {
        const name = cname + "=";
        let cookiesArr = document.cookie.split(';');
        for(let i=0; i<cookiesArr.length; i++) {
            const c = cookiesArr[i].trim();
            if (c.indexOf(name)===0) { return c.substring(name.length,c.length); }
        }
        return "";
    }
}