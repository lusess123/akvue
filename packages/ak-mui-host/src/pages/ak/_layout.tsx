import React from 'react';
import layout from './../../master/userlayout'
import { withRouter, Route, Switch } from 'react-router'
import { Card, Modal } from 'antd';
import { truncateSync } from 'fs';
const Layout = layout as any;
export default (p) => {
    return <Layout {...p}>
        <div>{JSON.stringify(p.match.params)}</div>
        <hr />
        <Card>
            {routeGroup(Hull)}
        </Card>
        <Card>
            {routeGroup(WinHull)}
        </Card>
        <Card>
            {routeGroup(PanelHull)}
        </Card>
    </Layout>
}

const routeGroup = (hull) => {
    return <Switch>
        <Route path="/ak/:page/:ak1/:ak2/:ak3" component={hull} />
        <Route path="/ak/:page/:ak1/:ak2" component={hull} />
        <Route path="/ak/:page/:ak1" component={hull} />
        <Route path="/ak/:page" component={hull} />
        <Route path="/ak" component={hull} />
    </Switch>;
}


export class Hull extends React.Component<any, any> {

    ShowSign = "";

    renderMain() {
        return <div>{JSON.stringify(this.props.match.params)}</div>;
    }

    render() {

        return this.willShow(this.ShowSign) ?
            this.renderMain()
            : null;
    }

    willShow(start: string) {
        const { page } = this.props.match.params;
        if (start) {
            if ((page as string).toUpperCase().startsWith(start)) {
                return true;
            }
            else
                return false;
        }
        else
            return !(this.willShow("WIN") || this.willShow("PANEL"));
    }

    componentWillUpdate() {
        //  alert("componentWillUpdate");
    }

    shouldComponentUpdate(p, s, c) {

        const { page } = p.match.params;
        //  alert(page);
        if (page) {
            if ((page as string).toUpperCase().startsWith("WIN")) {
                return false;
            }
            if ((page as string).toUpperCase().startsWith("PANEL")) {
                return false;
            }
        }
        return true;
    }
}


export class ModalWin extends React.Component<any, any> {
    // state = { v: true }
    render() {
        return <Modal
            onCancel={() => { this.props.onCancle() }}
            visible={this.props.v}>
            <div>{JSON.stringify(this.props.match.params)}</div>
        </Modal>
    }
}

export class WinHull extends Hull {
    ShowSign = "WIN";

    state = { v: true }
    renderMain() {
        return <ModalWin onCancle={
            () => {
                this.state.v = false;
                this.forceUpdate()
            }} v={this.state.v} ref="xxx"  {...this.props} />;
    }



    shouldComponentUpdate(p, s, c) {

        const { page } = p.match.params;
        alert(page);
        if (page) {
            if ((page as string).toUpperCase().startsWith("WIN")) {
                this.state.v = true;

                return true;
            }
            if ((page as string).toUpperCase().startsWith("PANEL")) {
                return false;
            }
        }
        return false;
    }
}
export class PanelHull extends Hull {
    ShowSign = "PANEL";
    shouldComponentUpdate(p, s, c) {

        const { page } = p.match.params;
        //  alert(page);
        if (page) {
            if ((page as string).toUpperCase().startsWith("WIN")) {
                return false;
            }
            if ((page as string).toUpperCase().startsWith("PANEL")) {
                return true;
            }
        }
        return false;
    }
}