import React, {useState, useEffect} from 'react'
import { Tools, Storage } from '../../utils/tools'
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom'
import './index.less'
import { getSession } from '../../api/user'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';


export default function Index() {
    const [ userInfo, SetUserInfo ] = useState(null)

    useEffect(() => {
        const token = Tools.getToken()
        if(token !== '') {
            getSession({token}).then(res => {
                if (res.status_code === 200) {
                    console.log(res.data)
                    SetUserInfo(res.data)
                }
            })
        }
    }, [userInfo])

    const handleLogout = () => {
        Tools.userLogout()
        setTimeout(() => {
            SetUserInfo(null)
        }, 500);
    }
    const menu = (
        <Menu className="menu">
          <Menu.Item  key="0" icon={<UserOutlined />} >
            <Link to="/user/profile">我的账户</Link>
          </Menu.Item>
          {/* <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
          </Menu.Item> */}
          <Menu.Divider />
          <Menu.Item  key="3" icon={<LogoutOutlined />}>
              <span onClick={() =>handleLogout()}>退出登录</span>
          </Menu.Item>
        </Menu>
    );

    return (
        <div className="homePage_wrapper">
            <div className="bg_wrapper">
                <h1>Tarotify</h1>
                { userInfo === null &&
                    <div className="demoLogin">
                        <Button type="round"><Link to="/user/login">登录 / Login</Link></Button>
                    </div>
                }
                { userInfo !== null &&
                    <div className="demoLogin">
                        <Dropdown overlayClassName="dropdownMenu" overlay={menu} trigger={['click']}>
                            <Avatar className="avatar" size={40} src={userInfo.avatar} />
                        </Dropdown>
                    </div>
                }      
            </div>
        </div>
   )
}