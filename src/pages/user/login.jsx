import React, {useState, useEffect} from 'react'
import {Tools} from '../../utils/tools'
import './login.less'
import google from '../../asset/img/logo_google.png'
import github from '../../asset/img/logo_github.png'

export default function Login() {
    const [initGoogle, setInitGoole] = useState(false)
    const [githubCode, setGithubCode] = useState('')
    useEffect(() => {
      const showGoogleAuth = (GoogleAuth) => {
        if (typeof GoogleAuth === 'undefined') return
        //GoogleAuth.attachClickHandler(container, options, onsuccess, onfailure)
         GoogleAuth.attachClickHandler(document.getElementById('signin-google'), {}, function(googleUser) {
           // 前端自己的回调函数，拿到授权后的googleuser信息向后端发送信息
           handleGoogleCallback(googleUser.getAuthResponse().id_token)
         }, function(err) {
            console.log('验证取消')
            console.log(err)
         }
         )
    }
  
  
      // 还没生成googleAuth
      if (typeof window.GoogleAuth === 'undefined') {
        Tools.initGoogleAuth((GoogleAuth) => {
          showGoogleAuth(GoogleAuth)
          setInitGoole(true)
        })
      }else{
        showGoogleAuth(window.GoogleAuth)
      }
    }, [])
   
    const handleGoogleCallback = token => {
      // 调后端接口，把token传给后端，后端再用token来向google验证
      // dispatch({
      //   type:'user/loginGoogle',
      //   payload: {
      //     token: token,
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
      console.log(token)
    }
  
    useEffect(() => {
      if (window.location.search !== undefined) {
        setGithubCode(window.location.search.split('code=')[1])
      }
      console.log(githubCode)
    }, [githubCode])
  
    const onGooleClick = (e) => {
      if(initGoogle === false) {
        console.log('google登录初始化失败')
        return
      }
    }
  
    const onGithubClick = (e) => {
      // 登录开新窗口
      window.open(Tools.initGithubAuth(), "", "height=600, width=700")
    }
    return(
        <React.Fragment>
            <div className="loginWrapper">
                <div className="login_title">
                    <h2>
                        <strong>Login Account</strong>
                    </h2>
                    <div className="login_title_des">Your are the next artist!</div>
                </div>
                <div className="oauth_platform">
                    <div className="btnWrapper">
                        <div className="signinGoogle" id="signin-google" onClick={e => onGooleClick(e)}><img className="google" src={google} alt="google"></img>Google 登录</div>
                        <div className="signinGoogle"  onClick={e => onGithubClick(e)}><img className="google" src={github} alt="github"></img>Github 登录</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}