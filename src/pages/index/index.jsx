import React, {useState, useEffect} from 'react'
import { Tools, Storage } from '../../utils/tools'
import { Button, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import './index.less'
import { getSession } from '../../api/user'


export default function Index() {
    const [ userInfo, SetUserInfo ] = useState(null)

    useEffect(() => {
        const token = Storage.getCookie('_TARO_TOKEN_')
        if(token !== '') {
            getSession({token}).then(res => {
                if (res.status_code === 200) {
                    console.log(res.data)
                    SetUserInfo(res.data)
                }
            })
        }
    }, [])

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
                    <Link to="/user/profile"><Avatar size={50} src={userInfo.avatar} /></Link>
                 </div>
            }      
        </div>
    </div>
   )
}