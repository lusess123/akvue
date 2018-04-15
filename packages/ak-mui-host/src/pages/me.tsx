import React from 'react';
import Button from "antd/lib/button"
import { connect } from 'dva';
import  * as sys from "ak-lib-sys"

export default connect((p) => {
    return { ...p }
})(
    (props) => {
        // debugger;
        return <div>
            <pre><code>{sys.core.json(
                {
                    ...props,
                    ... {
                        match: undefined,
                        history: undefined,
                        location: undefined,
                        route:undefined,
                        routing:undefined,
                        children:undefined

                    }
                })}</code></pre>
            <br />
            <Button>fff</Button>
        </div>
    }
)


