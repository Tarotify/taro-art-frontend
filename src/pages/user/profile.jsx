import React,{useState,useEffect} from 'react'
// import Header from '../../component/header'
// import Footer from '../../component/footer'
import './profile.less'
import { Menu,Form,Select,Input,Button,Checkbox,notification,InputNumber,Upload,message,Avatar,List,Result,Modal,Tag } from 'antd';
import { GoogleCircleFilled, FacebookFilled,TwitterCircleFilled,UploadOutlined } from '@ant-design/icons';
// import {GlobalVar} from '../../utils/global_var'
import{useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function UserProfile() {
    const type = 2;
    const [key, setKey] = useState('Basic')
    //取用户信息，和更新用户信息
    // const [userData, setUserData]= useState(Tools.loadUserInfo('user_Info') )
    const [userData, setUserData] = useState({
        'firstName': '123',
        'lastName': '123' ,
        'nickName': '123',
        'country': 'CN',
    })
    //取用户类型只取1次所以不用useState
    const userType = 1
    
    
    const [inital, setInital] = useState('U')

    let history = useHistory();
    // const country = GlobalVar.country

    useEffect(() => {
        getInitial()
    }, [])
    
    useEffect(() => {
        // const updated = Tools.loadUserInfo('user_Info')
        console.log('update')
        // setUserData(updated)
    }, [key])
    

    //控制menu显示的内容
    const rightDiplay = (key) =>{
        setKey(key)
    }
    const onFinish = (value)=>{
        // 更新'userData'数据
        userData.firstName = value.firstName
        userData.lastName = value.lastName
        userData.nickName = value.nickName
        userData.country = value.country
        userData.degree = value.degree
        userData.language = value.language

        // Tools.saveUserInfo(JSON.stringify(userData))
        
        notification.success(
            {
                message: 'Save successfully!',
                duration: '6',
                placement: "bottomRight"
            }
        )
        setTimeout(()=>{
            window.location.reload()
        },3000)
    }
    const { Option } = Select;

    const formItemLayout = {
        labelCol: {
            span: 13,
        },
        wrapperCol: {
            span: 13,
            offset:10
        },
    };
    const OptCountry = () => {
        // const option = country.map((item,index)=>{
        //         return(
        //             <Option value={item.abs} key={index}>{item.name}</Option>
        //         )
        //     })
        // return option
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    
    const getInitial = () =>{
        const firstname = userData.firstName
        console.log(firstname)
        const letterArr = firstname.split("")
        setInital(letterArr[0])
    }

    const securityData = [
        {
          id:1,
          title: 'Account Password',
          description:"Current password strength：Strong"
        },
        {
          id:2,
          title: 'Security Phone',
          description:"Bound phone：138****8293"
        },
        {
          id:3,
          title: 'Security Question',
          description:"The security question is not set, and the security policy can effectively protect the account security"
        },
        {
          id:4,
          title: 'Backup Email',
          description:'Bound Email：'
        },
        {
          id:5,
          title: 'MFA Device',
          description:'Unbound MFA device, after binding, can be confirmed twice'
        },
    ];

    const bindingData = [
                        {   
                            avatar: <GoogleCircleFilled className="gg"/>,
                            title:"Binding Google",
                             description: "Currently unbound Binding Google"
                        },
                        {
                            avatar: <FacebookFilled className="fb"/>, 
                            title:"Binding Fackbook",
                            description: "Currently unbound Facebook account"
                        },
                        {   
                            avatar: <TwitterCircleFilled className="tw"/>,
                            title:"Binding Twitter",
                            description: "Currently unbound Twitter account"
                        }
                    ];

    const [pwdModal, setPwdModal]  = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    
    const handelModify = (key) =>{
        if(key === 1){
            setPwdModal(true)
        }
    }

    const handleOk = () =>{
            // setLoading(true)
            form.submit();
    }

    const handleCancel = () =>{
        setPwdModal(false)
    }

    const handlePasswordOk = (value) => {
        console.log(value)
        if(value){
           if(userData.password === value.currentPwd){

            userData.password = value.confirm
            userData.confirm = value.confirm

            //  Tools.saveUserInfo(JSON.stringify(userData)) 
             notification.success(
                {
                    message: 'Upfate successfully!',
                    duration: '4',
                    placement: "TopRight"
                }
            )
             setPwdModal(false)
           }
        }
    }

    const pwdFormLayout = {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 12,
            // offset:10
        },
    };
    return (
    <> 
     {/* <Header type={type}></Header> */}
    <div className="wrapper">
        <div className="profileContainer">
            <div className="leftMenu">
                <Menu
                    style={{
                        width: 224
                    
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1']}
                    mode="inline"
                    className="menu">
                    <Menu.Item key="1" onClick={() => rightDiplay('Basic')}>Basic Settings</Menu.Item>
                    <Menu.Item key="2" onClick={() => rightDiplay('Security')}>Security Settings</Menu.Item>
                    <Menu.Item key="3" onClick={() => rightDiplay('Binding')}>Account Binding</Menu.Item>
                    <Menu.Item key="4" onClick={() => rightDiplay('403')}>New Messgae Notification</Menu.Item>
                </Menu>
            </div>
            <div className="right">
                {  key === 'Basic'  && userData !=={} &&
                        <>
                            <div className="profiletitle">Basic Settings</div>
                            <div className="basicWrapper">
                                <div className="infoForm">
                                    <Form
                                        onFinish={onFinish}
                                        className="setting_form"
                                        {...formItemLayout}
                                        // labelCol={labelStyle}
                                        labelAlign="left"
                                        initialValues={userData}
                                        >
                                    <Form.Item
                                        className="setting_form_item"
                                        name="name"
                                        label="User name"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                        ]}
                                    >
                                    <Input placeholder="username" className="select_input">
                                    </Input>
                                    </Form.Item>                               
                                    <Form.Item
                                        className="setting_form_item"
                                        name="age"
                                        label=" Age"
                                        hasFeedback
                                    >
                                    <Input placeholder="Your age" className="select_input">
                                    </Input>
                                    </Form.Item>
                                    <Form.Item
                                        className="setting_form_item"
                                        name="country"
                                        label="Country"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please select your country!',
                                        },
                                        ]}
                                    >
                                    <Select placeholder="Please select a country" className="select_input">
                                    <Option value="" selected="selected">Select Country</Option> 
                                        {OptCountry()}
                                    </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="setting_form_item"
                                        name="degree"
                                        label="Degree"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please select your degree!',
                                        },
                                        ]}
                                    >
                                    <Select placeholder="Please select your degree" className="select_input">
                                    <Option value="HighSchool">High School</Option>
                                    <Option value="Bachelor">Bachelor</Option>
                                    <Option value="Master">Master</Option>
                                    <Option value="PhD">PhD</Option>
                                    </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="setting_form_item"
                                        name="learn"
                                        label="What language will you learn"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please select the language',
                                        },
                                        ]}
                                    >
                                    <Select placeholder="Please select the language" className="select_input">
                                        <Option value="A-English">American English</Option>
                                        <Option value="English">English</Option>
                                        <Option value="Chinese">Chinese</Option>
                                        <Option value="French">French</Option>
                                        <Option value="Spanish">Spanish</Option>
                                        <Option value="Japanese">Japanese</Option>
                                        <Option value="Portuguese">Portuguese</Option>
                                    </Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="setting_form_item"
                                        name="language"
                                        label="How many language do you speak"
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please select the number',
                                        },
                                        ]}
                                    >
                                        <InputNumber min={1} max={10} defaultValue={3} className="select_inputNumber" />
                                    </Form.Item>
                                    {/* <Form.Item className="setting_form_item">
                                                <Button type="primary" htmlType="submit" className="saveButton">
                                                <span>save</span>
                                                </Button>
                                    </Form.Item> */}
                                    <Form.Item className="setting_form_item">
                                            <Button type="primary" shape="round"  size='large'  htmlType="submit" className="saveButton">
                                                Confirm
                                            </Button>
                                    </Form.Item>
                                    </Form>
                                </div>
                                <div className="userAvatar">
                                    {/* <div className="avataTitle">Avatar</div> */}
                                    <div> <Avatar size={80} style={{ color: '#f56a00', backgroundColor: '#fde3cf', fontSize: 30, marginTop: 10, marginBottom:20 }}>{inital}</Avatar></div>
                                    <div>
                                    <Upload {...props}>
                                        <Button>
                                        <UploadOutlined /> Change avatar
                                        </Button>
                                    </Upload>,
                                    </div>
                                </div>
                            </div>
                        </>
                }
                {    key === 'Security' && 
                        <>
                            <div className="profiletitle">Security Settings</div>
                            <List
                                className="securityList"
                                itemLayout="horizontal"
                                dataSource={securityData}
                                size="large"
                                renderItem={item => (
                                <List.Item 
                                    actions={[<a key={item.id} onClick={() => handelModify(item.id)}>Modify</a>]}>
                                    <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                    />
                                </List.Item>
                                )}
                            />,
                        </>

                }
                {    key === 'Binding' && 
                        <>
                            <div className="profiletitle">Binding Settings</div>
                            <List
                                className="BindingList"
                                itemLayout="horizontal"
                                dataSource={bindingData}
                                size="large"
                                renderItem={item => (
                                <List.Item 
                                    actions={[<a key="list-loadmore-edit">Bind</a>]}>
                                    <List.Item.Meta
                                    avatar={
                                    <Avatar>{item.avatar}</Avatar>
                                    }
                                    title={item.title}
                                    description={item.description}
                                    />
                                </List.Item>
                                )}
                            />,
                        </>

                }
                {
                    key === '403' &&
                    <>
                        <Result
                            className="result"
                            status="403"
                            title="403"
                            subTitle="Sorry, you are not authorized to access this page."
                            extra={<Button  onClick={()=>{window.location.replace('/')}}type="primary">Back Home</Button>}
                        />
                    </>
                }
            </div>
        </div>
        <Modal
          visible={pwdModal}
          title='Change password'
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Submit
            </Button>,
            ]}
        >
            <Form
                form={form}
                onFinish={handlePasswordOk}
                className="pwd_form"
                {...pwdFormLayout}
                // labelCol={labelStyle}
                labelAlign="left"
                >
                <Form.Item
                    className="setting_form_item"
                    name="currentPwd"
                    label="Current password"
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please input your current password',
                    },
                    ]}
                >
                    <Input.Password placeholder="" className="select_input"></Input.Password>
                </Form.Item>
                <Form.Item
                    className="student_form_item"
                    name="password"
                    label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password className="select_input"/>
                </Form.Item>
                <Form.Item
                    className="student_form_item"
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                    ]}
                 >
                    <Input.Password className="select_input"/>
                </Form.Item>
             </Form>
        </Modal>
    </div>
    {/* <Footer/> */}
    </>
    )
}
