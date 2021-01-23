import React from 'react'
import { Divider, Form, Input, Button} from 'antd'
import './forgetpw.less'
import { Link } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

export default function Reg () {
    return(
        <React.Fragment>
            <div className="regWrapper">
                <div className="reg_title">
                    <h2>
                        <strong>Find Password</strong>
                    </h2>
                    <div className="reg_title_des">Your are the next artist!</div>
                </div>
                <div className="reg_content">
                <div className="regFormWrapper">
                        <Form
                            name="normal_reg"
                            className="reg-form"
                            initialValues={{
                                remember: true,
                            }}
                            // onFinish={onFinish}
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
        </React.Fragment>
    )
}