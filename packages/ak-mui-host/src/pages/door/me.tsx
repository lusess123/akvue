import React from 'react';
import Button from "antd/lib/button"
import { connect } from 'dva';
import  * as sys from "ak-lib-sys"
import { DemoVm } from "./models/door"

const pp = 
    (props) => {
        const { door } = props;
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
            <hr />
            <pre><code>{sys.core.json(door.Vm)}</code></pre>

            <Button>点击我</Button>
        </div>
    }

//export default pp ;
export default connect((p) => {
    return { ...p }
})(pp);








