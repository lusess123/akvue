
import React from 'react'
import dva from 'dva';
import webcom from './page/web'
import { routerRedux, Route, Switch } from 'dva/router';
const { ConnectedRouter } = routerRedux;

import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import './index.less';
import './UserLayout.less';
import 'antd/dist/antd.css';

const app = dva({
    history: createHistory(),
    initialState: { count: 1 }
});
app.model({
    namespace: 'count',
    state: 0,
});
app.use(createLoading());
app.router(({ history, app }) => {
    return (<ConnectedRouter history={history}>
        <Switch>
            <Route  path="/web/:page/:p1/:p2/:p3" component={webcom} />
            <Route  path="/web/:page/:p1/:p2" component={webcom} />
            <Route  path="/web/:page/:p1" component={webcom} />
            <Route  path="/web/:page" component={webcom} />
            <Route  path="/web" component={webcom} /> 
            <Route  path="/login" component={webcom} /> 
            <Route  path="/" component={webcom} />
        </Switch>
    </ConnectedRouter>)
});
app.start('#root');
export default app._store; // eslint-disable-line


