import React, {useState, useEffect} from 'react'
import { Tools, Storage } from '../../utils/tools'
import './login.less'
import google from '../../asset/img/logo_google.png'
import github from '../../asset/img/logo_github.png'
import { Divider, Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { userLogin } from '../../api/user'


export default function Login() {
    const [initGoogle, setInitGoole] = useState(false)
    const [loginStatus, setLogInStatus] = useState(false)
    const history = useHistory()

    // 登录状态改变 开始监听storage
    useEffect(() => {
      if(loginStatus) {
        const githubOauthIntervel = setInterval(() => {
          const result = Storage.getLocal('taro_user_verify')
          if (result !== null) {
            console.log('验证通过将跳转....')
            // 不同的user_verify 挑转不同的地方
            if(result.user_verify === 0) {
              // 引导去填email
              history.push('/user/reg/bindemail')
            }
            if(result.user_verify === 99) {
              // 登录成功， 存token
              Tools.setToken(result.token)
              message.success('登录成功', 2,  history.push('/'));
            }
          }
        }, 1500);
        return () => {
          clearInterval(githubOauthIntervel)
        }
      }else{
        return null
      }
    }, [loginStatus])

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
  
    const onGooleClick = (e) => {
      if(initGoogle === false) {
        console.log('google登录初始化失败')
        return
      }
    }
  
    const onGithubClick = (e) => {
      const iHeight = 600
      const iWidth = 700
      const iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
      const iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
      // 登录开新窗口
      window.open(Tools.initGithubAuth(), "", `top=${iTop}, left=${iLeft} height=${iHeight}, width=${iWidth}`)
      // 推进状态开始监听localStroge里的验证值
      setLogInStatus(true)
    }

    // useEffect(() => {
    //   window.addEventListener('message', (event) => {
    //     if(event.origin === 'http://localhost:3000') {
    //       console.log(event.data)
    //     }
    //   })
    // }, [])

    const onFinish = (values) => {
      userLogin(values).then(res => {
        if(res.status_code === 200) {
          Tools.setToken(res.data.token)
          message.success('登录成功', 2,  history.push('/'));
        }
        if(res.status_code === 400 ){
          message.warning('该邮箱未注册', 4);
          return null
        }
        if(res.status_code === 401 ){
          message.warning('密码不正确', 4);
          return null
        }
      })
        console.log('Received values of form: ', values);
    };

    return(
        <React.Fragment>
            <div className="loginWrapper">
                <div className="login_title">
                    <h2>
                        <strong>Login Account</strong>
                    </h2>
                    <div className="login_title_des">Your are the next artist!</div>
                </div>
                <div className="login_content">
                    <div className="loginFormWrapper">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            >
                            <Form.Item
                                name="email"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="邮箱" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                ]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Link className="login-form-forgot" to="/user/forgetpassword">
                                     Forgot password?
                                </Link>
                                <Button type="primary" shape="round"  size='large'  htmlType="submit" className="login-form-button">
                                Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider plain><span className="thridPatry_title">或者使用第三方账号登录</span></Divider>
                    <div className="thridPatryWrapper">
                        <div className="signinGoogle" id="signin-google" onClick={e => onGooleClick(e)}><img className="google" src={google} alt="google"></img>Google 登录</div>
                        <div className="signinGoogle"  onClick={e => onGithubClick(e)}><img className="google" src={github} alt="github"></img>Github 登录</div>
                    </div>
                    <div className="toRegister">
                        还没有账号？<Link to="/user/reg">点击加入Taro大家庭</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}