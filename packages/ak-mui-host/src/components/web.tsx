import React from 'react';
import { withRouter,Route } from 'react-router'
import Button from "antd/lib/button"


export default withRouter(({match}) => {
    return <div>{JSON.stringify( match.params)}
          <Button>fff</Button>
          <Route path="/web/:page" component={Hull}/>
    </div>
})


export  class  Hull extends React.Component<any,any> {
    render(){
        return <div>{JSON.stringify(this.props.match.params)}</div>
    }
}