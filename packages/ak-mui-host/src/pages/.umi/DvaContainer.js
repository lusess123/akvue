import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ ...(require('/Users/zyking/Documents/demo/pro-demo/akvue/packages/ak-mui-host/src/models/global.ts').default) });
app.model({ ...(require('/Users/zyking/Documents/demo/pro-demo/akvue/packages/ak-mui-host/src/models/login.ts').default) });
app.model({ ...(require('/Users/zyking/Documents/demo/pro-demo/akvue/packages/ak-mui-host/src/models/user.ts').default) });
app.model({ ...(require('/Users/zyking/Documents/demo/pro-demo/akvue/packages/ak-mui-host/src/pages/door/models/door.ts').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
