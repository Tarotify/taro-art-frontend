import React, { useState } from 'react'
import { Divider, Form, Input, Button, notification, message} from 'antd'
import './forgetpw.less'
import { Link, useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, SafetyOutlined, MailOutlined } from '@ant-design/icons';
import { userVerifyAccount, userPasswordReset } from '../../api/user'
// import { Storage } from '../../utils/tools'

export default function Forgetpw () {
    const [step, setStep] = useState(1)
    const [userInfo, setUserInfo] = useState(null)
    const history = useHistory()

    const onStepOneFinish = (value) => {
        console.log(value)
        userVerifyAccount(value).then(res => {
            if(res.status_code === 200) {
                console.log('发送成功')
                notification.open({
                    message: '验证码已发送',
                    description:
                      '验证码将在1分钟内送达，请前往您的邮箱查收。',
                    icon: <MailOutlined  style={{ color: '#4aca6d' }} />,
                    duration: 10,
                });
                setUserInfo({...value})
                setStep(2)
            }
            if(res.status_code === 401) {
                message.warning('该邮箱未注册',4);
            }
        })
    }

    const onStepTwoFinish = (value) => {
        const data = {...value, ...userInfo}
        userPasswordReset(data).then(res => {
            if(res.status_code === 401) {
                message.warning('验证码错误',5);
            }
            if(res.status_code === 400 || res.status_code === 403) {
                message.warning('重设密码错误,请联系admin@taro.com',10);
            }
            if(res.status_code === 200 ) {
                message.success('密码重设成功');
                history.push('/user/login')
            }
        })        
    }

    return(
        <React.Fragment>
        {step === 1 &&
            <div className="regWrapper">
                <div className="reg_title">
                    <h2>
                        <strong>Find Password</strong>
                    </h2>
                    <div className="reg_title_des">verify your email with code</div>
                </div>
                <div className="reg_content">
                <div className="regFormWrapper">
                        <Form
                            name="normal_reg"
                            className="reg-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onStepOneFinish}
                            >
                            <Form.Item
                                name="email"
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please input correct email format!',
                                }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="邮箱" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" shape="round"  size='large'  htmlType="submit" className="reg-form-button">
                                    Send
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider></Divider>
                    <div  className="tologin">
                        记得账号密码了~ <Link to="/user/login">点击这里登录</Link>
                    </div>
                </div>
            </div>
        }
        {step === 2 &&
            <div className="regWrapper">
                <div className="reg_title">
                    <h2>
                        <strong>Reset Password</strong>
                    </h2>
                    <div className="reg_title_des">verify your email with code</div>
                </div>
                <div className="reg_content">
                <div className="regFormWrapper">
                        <Form
                            name="normal_reg"
                            className="reg-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onStepTwoFinish}
                            >
                            <Form.Item
                                name="code"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input verify code!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input prefix={<SafetyOutlined className="site-form-item-icon" />} size="large" placeholder="验证码" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                {
                                    whitespace: true,
                                    message: 'Password cannot contain space!',
                                },
                                {
                                    min: 6,
                                    message: 'Password should be at least 6 characters',
                                },
                                ]}
                                hasFeedback
                                >
                                    <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="新密码"
                                    size="large"
                                    />
                            </Form.Item>
                            <Form.Item
                                name="repassword"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please confirm your password!',
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                  }),
                                ]}
                                >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="二次确认密码"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" shape="round"  size='large'  htmlType="submit" className="reg-form-button">
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        }
        </React.Fragment>
    )
}