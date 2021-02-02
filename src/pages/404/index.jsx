import React from 'react'
import { Result, Button } from 'antd';
import './index.less'
import { useHistory } from 'react-router-dom';

export default function NoMatch() {
    const history = useHistory()
    const backtoHome = () => {
        history.replace('/')
    }
    return (
        <div className="no_match_container" >
            <Result
                className="no_match"
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={e => backtoHome(e)}>Back Home</Button>}
            />
        </div>
    )
}