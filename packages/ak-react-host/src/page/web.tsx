import React from 'react';
import { withRouter } from 'react-router'
import Button from "antd/lib/button"
import { connect } from 'dva';

export default connect((p) => {
    return { ...p }
})(
    (props) => {
        // debugger;
        return <div>
            <code>{JSON.stringify(props)}</code>
            <br/>
            <Button>fff</Button>
        </div>
    }
)


