import React from 'react';
import { withRouter } from 'react-router'
import Button from "antd/lib/button"

export default withRouter(({match}) => {
    return <div>{JSON.stringify( match.params)}
    <Button>fff</Button>
    </div>
})


