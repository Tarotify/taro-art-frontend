import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.less'

export default function AuthLoading() {
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />

    return(
        <div className="loadingWrapper">
            <Spin className="loading" indicator={antIcon} />
        </div>
    )
}