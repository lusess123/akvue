import React  from 'react';
import PropTypes from 'prop-types';
import {Button} from "antd"
import { connect } from 'dva';
import * as sys from "ak-lib-sys"
import { DemoVm } from "./models/door"


const Child1:React.SFC<any> = (p) => {
    return <div>
        <pre><code>{sys.core.json({ ...p })}</code></pre>

    </div>
}

export const Gg:any = ()=>{
     return <div></div>
}

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
                        route: undefined,
                        routing: undefined,
                        children: undefined

                    }
                })}</code></pre>
            <hr />
            <pre><code>{sys.core.json(door.Vm)}</code></pre>

            <Button >点击我</Button>
            <Child1 {...props}  />
            <hr/>
            <h1>子组件</h1>
            <AA/>
        </div>
    }

//export default pp ;
export default connect((p) => {
    return { ...p }
})(pp);

const  Vvv = connect()(Gg);


const Child = connect(
    (p) => {
        return { 
           // ...p, 
            xxx: p.door 
        }
    }
    )(Child1);


    export  class AA extends React.Component<any,any> {
       static contextTypes = { store: PropTypes.object.isRequired }
          render(){
              debugger;
              const _ff = this.context.store.getState();
              return <div><Child1  {..._ff}   /></div>
          }
    }








