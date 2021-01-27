import React, { useEffect, useState } from 'react'
import { Divider, Form, Input, Button} from 'antd'
import './reg.less'
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Storage } from '../../utils/tools'

export default function RegBind () {
    const [userInfo, setUserInfo] = useState(null)
    const [step, setStep] = useState(1)
    const history = useHistory()
    useEffect(() => {
        const result = Storage.getLocal('taro_user_verify')
        if (result) {
            setUserInfo(result)
        }else{
            history.replace('/')
        }
    },[])

    const onStepOneFinish = (value) => {
        setUserInfo({...value, ...userInfo})
        setStep(2)
    }

    const onStepTwoFinish = (value) => {
        const data = {...value, ...userInfo}
        console.log(data)  
    }

    if (userInfo === null) {
        return null
    }
    return(
        <React.Fragment>
            {step === 1 &&
                <div className="regWrapper">
                    <div className="reg_title">
                        <h2>
                            <strong>Account Binding</strong>
                        </h2>
                        <div className="reg_title_des">Hi <b>{userInfo.name}</b> ! Please input or verify your email. </div>
                    </div>
                    <div className="reg_content">
                    <div className="regFormWrapper">
                            <Form
                                name="email_bind"
                                className="reg-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onStepOneFinish}
                                >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email !',
                                        },
                                        {
                                            type: "email",
                                            message: "The input is not valid E-mail !"
                                        }
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="邮箱" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" shape="round"  size='large'  htmlType="submit" className="reg-form-button">
                                        Bind
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        {/* <Divider></Divider>
                        <div  className="tologin">
                            已有账号了？<Link to="/user/login">点击这里登录</Link>
                        </div> */}
                    </div>
                </div>
            }
            {step === 2 &&
                <div className="regWrapper">
                    <div className="reg_title">
                        <h2>
                            <strong>Account Binding</strong>
                        </h2>
                        <div className="reg_title_des">Hi <b>{userInfo.name}</b> ! Please set your security. </div>
                    </div>
                    <div className="reg_content">
                    <div className="regFormWrapper">
                            <Form
                                name="password_confirm"
                                className="reg-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onStepTwoFinish}
                                >
                               <Form.Item
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                    ]}
                                    hasFeedback
                                >
                                    <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
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
                                    placeholder="确认密码"
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
                        {/* <Divider></Divider>
                        <div  className="tologin">
                            已有账号了？<Link to="/user/login">点击这里登录</Link>
                        </div> */}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}