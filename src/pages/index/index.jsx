import React, {useState, useEffect} from 'react'
import { Tools } from '../../utils/tools'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import './index.less'
import { getSession } from '../../api/user'
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import Header from '../../components/header'
import Footer from '../../components/footer'
// WebWorker helper class
import WebWorker from '../../utils/webWorker';
// Your web worker
import LoopWorker from '../../worker/loopWorker';

// console.log('Init worker...')

// // Worker init
// const workerInstance = new WebWorker(LoopWorker) 


// // Listening for messages from worker
// workerInstance.addEventListener("message", e => {

//   console.log('[MAIN] MSG FROM WORKER: ', e.data)


// }, false)


// workerInstance.postMessage("Hi, worker! I'm main thread!")
export default function Index() {
    const [ userInfo, SetUserInfo ] = useState(undefined)
    const token = Tools.getToken()
    console.log('Init worker...')
    const workerInstance = new WebWorker(LoopWorker);
    useEffect(() => {
        workerInstance.postMessage("bar");  
        workerInstance.onmessage = function(evt) {
            // console.log('主收'+evt.data)
            console.log(evt)
        }
    }, [])
    
    useEffect(() => {
        if(token !== '') {
            getSession({token}).then(res => {
                if (res.status_code === 200) {
                    SetUserInfo(res.data)
                }
            })
        }else{
            SetUserInfo(null)
        }
    }, [token])

    const handleLogout = () => {
        //清除token
        console.log('退出了')
        Tools.userLogout()
        SetUserInfo(null)
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
            <Header/>
            <Footer/>
        </div>
   )
}