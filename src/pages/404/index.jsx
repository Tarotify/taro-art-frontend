import React from 'react'
import { Result, Button } from 'antd';
import './index.less'
export default function NoMatch() {
    return (
        <div className="no_match_container" >
            <Result
                className="no_match"
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    )
}