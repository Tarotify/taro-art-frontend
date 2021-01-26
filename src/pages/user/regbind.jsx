import React, { useEffect, useState } from 'react'
import { Divider, Form, Input, Button} from 'antd'
import './reg.less'
import { Link, useHistory } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Storage } from '../../utils/tools'

export default function RegBind () {
    const [userInfo, setUserInfo] = useState(null)
    const history = useHistory()
    useEffect(() => {
        const result = Storage.getLocal('taro_user_verify')
        if (result) {
            setUserInfo(result)
        }else{
            history.replace('/')
        }
    },[])
    const onFinish = () => {

    }
    if (userInfo === null) {
        return null
    }
    return(
        <React.Fragment>
            <div className="regWrapper">
                <div className="reg_title">
                    <h2>
                        <strong>Account Binding</strong>
                    </h2>
                    <div className="reg_title_des">Hi <b>{userInfo.name}</b> ! Your are in final step. </div>
                </div>
                <div className="reg_content">
                <div className="regFormWrapper">
                        <Form
                            name="normal_reg"
                            className="reg-form"
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
        </React.Fragment>
    )
}