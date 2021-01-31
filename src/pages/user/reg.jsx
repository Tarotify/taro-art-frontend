import React, { useState } from 'react'
import { Divider, Form, Input, InputNumber, Button, message, notification} from 'antd'
import './reg.less'
import { Link, useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, SafetyOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import { userRegCheck, userReg } from '../../api/user'
import { Tools } from '../../utils/tools'

export default function Reg () {
    const [step, setStep] = useState(1)
    const [userInfo, setUserInfo] = useState(null)
    const history = useHistory()

    const onStepOneFinish = (value) => {
        console.log(value)
        userRegCheck(value).then(res => {
            if(res.status_code === 200) {
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
            if(res.status_code === 400) {
                message.warning('该邮箱已注册',4);
                return null
            }
        })
    }

    const onStepTwoFinish = (values) => {
        // 没填电话
        values.phone = values.phone === undefined ? '': values.phone
        const data = {...values, ...userInfo}
        userReg(data).then(res => {
            if(res.status_code === 401) {
                message.warning('验证码错误',5);
            }
            if(res.status_code === 400 || res.status_code === 403) {
                message.warning('重设密码错误,请联系admin@taro.com',10);
            }
            if(res.status_code === 200 ) {
                Tools.setToken(res.token)
                message.success('注册成功', 2, history.push('/'));
            }
        })        
    }

    return(
        <React.Fragment>
        {step === 1 &&
            <div className="regWrapper">
                <div className="reg_title">
                    <h2>
                        <strong>Register Account</strong>
                    </h2>
                    <div className="reg_title_des">You are the next artist</div>
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
                                    Next
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
                        <strong>Account Information</strong>
                    </h2>
                    <div className="reg_title_des">Fill your profile</div>
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
                                name="name"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="昵称" />
                            </Form.Item>
                            <Form.Item
                                name="age"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your age!',
                                },
                                ]}
                            >
                                <Input prefix={<CalendarOutlined className="site-form-item-icon" />} size="large" placeholder="年龄" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                // rules={[
                                // {
                                //     required: true,
                                //     message: 'Please input your phone!',
                                // },
                                // ]}
                            >
                                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} size="large" placeholder="手机号（选填）" />
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