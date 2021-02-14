import React, {useState, useEffect} from 'react'
import { Tools } from '../../utils/tools'
import { Button, Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom'
import './index.less'
import { getSession } from '../../api/user'
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';

export default function Index({type}) {
    const [ userInfo, SetUserInfo ] = useState(undefined)
    const token = Tools.getToken()
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
          <Menu.Item  key="0">
            <Link to="/user/profile"><UserOutlined />我的账户</Link>
          </Menu.Item>
          {/* <Menu.Item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
          </Menu.Item> */}
          <Menu.Divider />
          <Menu.Item  key="3">
              <span onClick={() =>handleLogout()}><LogoutOutlined />退出登录</span>
          </Menu.Item>
        </Menu>
    );

    // const howItWorkmenu = (
    //     <Menu className="dropdown_MenuWork">
    //     <Menu.Item key="0">
    //         <Link to="/about"><span className="workMenuItem">ABOUT US</span></Link>
    //     </Menu.Item>
    //     <Menu.Item key="1">
    //         <Link to="/contact"><span className="workMenuItem">CONTACT US </span></Link>
    //     </Menu.Item>
    //     <Menu.Item key="2">
    //         <Link to="/join"><span className="workMenuItem">JOIN US </span></Link>
    //     </Menu.Item>
    //     <Menu.Item key="3">
    //         <Link to="/covid19"><span className="workMenuItem">COVID-19 STATISTIC</span></Link>
    //     </Menu.Item>
    // </Menu> 
    // )   

    //type2 不透明带右侧
    //type3 不透明 不带右侧
    //默认  透明
    // if (type === 2) {
    //     return (
    //         <React.Fragment>
    //             <div className="header" id="header2">
    //                 <div className="row">
    //                     <Link to='/'>
    //                         <span className="logo">
    //                             <i>1-2-1 Language</i>
    //                         </span>
    //                     </Link>
    //                     <p className="logo-sticky">
    //                         <i>1-2-1 Language</i>
    //                     </p>
    //                     <ul className="main-nav js-main-nav">
    //                         <Link to='/'>
    //                             <li>Home</li>
    //                         </Link>
    //                         <Link to='/'>
    //                             <li>Course</li>
    //                         </Link>
                         
    //                         <Dropdown overlay={howItWorkmenu}>
    //                         <Link to='/' className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    //                             <li>How it works</li>
    //                         </Link>
    //                         </Dropdown>
    //                         {
    //                             hasUser === false && <Link to="/login">
    //                                     <li>Sign up</li>
    //                                 </Link>
    //                         }
    //                         {
    //                             hasUser === true && <li>
    //                                     <Dropdown 
    //                                         overlay={userMenu} 
    //                                         trigger={['hover']} 
    //                                         overlayStyle= {{color: "red"}}
    //                                     >
    //                                         <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    //                                             <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginBottom: 5}}>{inital}</Avatar>
    //                                         </a>
    //                                     </Dropdown>
    //                                 </li>
    //                         }
    //                     </ul>
    //                     <a className="mobile-nav-icon">
    //                         <i className="icon ion-md-menu js-nav-icon"></i>
    //                     </a>
    //                 </div>
    //             </div>
    //         </React.Fragment>
    //     )
    // } else if (type === 3) {
    //     return (
    //         <React.Fragment>
    //             <div className="header" id="header2">
    //                 <div className="row">
    //                     <Link to='/'>
    //                         <span className="logo">
    //                             <i>1-2-1 Language</i>
    //                         </span>
    //                     </Link>
    //                     <p className="logo-sticky">
    //                         <i>1-2-1 Language</i>
    //                     </p>
    //                     <a className="mobile-nav-icon">
    //                         <i className="icon ion-md-menu js-nav-icon"></i>
    //                     </a>
    //                 </div>
    //             </div>
    //         </React.Fragment>
    //     )
    // } else {
        return (
            <React.Fragment>
                <div className="header">
                    <div className="header_inner">
                        <div className="title">
                            <Link to='/'>
                                    <div>
                                        <h1>TARO</h1>
                                        <h6>New MEdia Art</h6>
                                    </div>
                            </Link>
                        </div>
                            <ul>
                                <Link to="/"><li>Browsing</li></Link>
                                <Link to="/"><li>K-12 Learning</li></Link>
                                <Link to="/"><li>About</li></Link>                        
                                { userInfo === null &&
                                    <div>
                                        <Button type="round" className="loginBtn" icon={<LoginOutlined className="loginIcon" />}><Link to="/user/login"><span className="loginspan">Login</span></Link></Button>
                                    </div>
                                }
                                { userInfo !== null && userInfo !== undefined &&
                                    // <div>
                                        <Dropdown overlayClassName="dropdownMenu" overlay={menu} trigger={['click']}>
                                            <Avatar className="avatar" size={35} src={userInfo.avatar} />
                                        </Dropdown>
                                    // </div>
                                }      
                            </ul>
                        </div>
                </div>
            </React.Fragment>
        )
    // }
}
