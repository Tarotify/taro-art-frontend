import { Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.less'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { githubCodeAuth } from '../../api/oauth/index'
import { Storage } from '../../utils/tools'

export default function Oauthloading() {
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
    const param =  useLocation().search
    const [code, setcode] = useState('')

    // 从url拿到code
    useEffect(() => {
        if(param !== undefined) {
            let searchParams = new URLSearchParams (param)
            setcode(searchParams.get("code"))
        }
    },[param])

    // 拿code去后端验证
    useEffect(() => {
        if(code !== '') {
            console.log(code)
            // window.close()   
            const data ={ code }
            githubCodeAuth(data).then(res => {
                console.log(res)
                if(res.status_code === 200) {
                    // if(res.data.user_verify ==) {
                        // 更新storage
                        Storage.setLocal('taro_user_verify', res.data)
                        window.close()
                    // }
                }
            })
        }
    },[code])


    return(
        <div className="loadingWrapper">
            <div className="loading">
            {/* <Spin indicator={antIcon}  > */}
            <Spin tip="loading....">
                <Alert
                message="Github Account Validating"
                description="It will finish in a second, thank you for join in the family."
                type="info"
                />
            </Spin>
            </div>
        </div>
    )
}