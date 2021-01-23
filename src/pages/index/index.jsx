import React, {useState, useEffect} from 'react'
import {Tools} from '../../utils/tools'
import { Button } from 'antd';
import './index.less'
import google from '../../asset/img/logo_google.png'
import github from '../../asset/img/logo_github.png'

export default function Index() {
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
    return (
        <>
          {/* <div className={styles.home_container}> */}
          <div className="abc">
              123123123213
          </div>
          <div className="signinGoogle"  onClick={e => onGithubClick(e)}><img className="google" src={github} alt="github"></img>Github 登录</div>
          <div className="signinGoogle" id="signin-google" onClick={e => onGooleClick(e)}><img className="google" src={google} alt="google"></img>Google 登录</div>
          <Button>绿色的</Button>
          {/* <a href="#" onclick={signOut()}>Sign out</a> */}
            {/* <div className={styles.middleContainer}>
            <div className={styles.desc}>Prototyping Software</div>
            <img className={styles.sketchLogo} src={sketch} alt=""/><span className={styles.sketch}>Sketch</span>
            <img className={styles.FigmaLogo} src={figma} alt=""/><span className={styles.Figma}>Figma</span>
            <img className={styles.PrinciplehLogo} src={principle} alt=""/><span className={styles.principle}>Principle</span>
            </div>
          </div> */}
       </>
       )
   }