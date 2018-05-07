import React from 'react';
import layout from './../../master/userlayout'
import {withRouter, Route, Switch} from 'react-router'
import {Card, Modal} from 'antd';
import {truncateSync} from 'fs';
import Web from './../../common/web'
const Layout = layout as any;
export default(p) => {
    return <Layout {...p}>

        {routeGroup(Hull)}
       
    </Layout>
}
// <Card>     {routeGroup(WinHull)} </Card> <Card>     {routeGroup(PanelHull)}
// </Card>


// {routeGroup(WinHull)}
// {routeGroup(PanelHull)}


const routeGroup = (hull) => {
        return <Card>
            <Switch>
                <Route path="/ak/:page/:ak1/:ak2/:ak3" component={hull}/>
                <Route path="/ak/:page/:ak1/:ak2" component={hull}/>
                <Route path="/ak/:page/:ak1" component={hull}/>
                <Route path="/ak/:page" component={hull}/>
                <Route path="/ak" component={hull}/>
            </Switch>
        </Card>;
    }

    export class Hull extends React.Component < any,
    any > {

        ShowSign = "";

        renderMain() {
            const {page, ak1, ak2, ak3} = this.props.match.params;
            return <div>

                <Web Page={page} P1={ak1} P2={ak2} P3={ak3}/>
            </div>;
        }

        render() {

            return this.willShow(this.ShowSign)
                ? this.renderMain()
                : null;
        }

        willShow(start : string) {
            const {page} = this.props.match.params;
            if (start) {
                if ((page as string).toUpperCase().startsWith(start)) {
                    return true;
                } else 
                    return false;
                }
            else 
                return !(this.willShow("WIN") || this.willShow("PANEL"));
            }
        
        componentWillUpdate() {
            //  alert("componentWillUpdate");
        }

        shouldComponentUpdate(p, s, c) {

            const {page} = p.match.params;
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

    export class ModalWin extends React.Component < any,
    any > {
        // state = { v: true }
        render() {
            const {pageo,  ak1, ak2, ak3} = this.props.match.params;
            const page = pageo&&(pageo as string).length > 3?(pageo as string).substring(3):pageo;
            return <Modal
                onCancel={() => {
                this
                    .props
                    .onCancle()
            }}
                visible={this.props.v}>
                <Web Page={page} P1={ak1} P2={ak2} P3={ak3}/>
            </Modal>
        }
    }

    export class WinHull extends Hull {
        ShowSign = "WIN";

        state = {
            v: true
        }
        renderMain() {
            const {page, ak1, ak2, ak3} = this.props.match.params;
            return <ModalWin
                onCancle={() => {
                this.state.v = false;
                this.forceUpdate()
            }}
                v={this.state.v}
                ref="xxx"
                {...this.props}/>;
        }

        shouldComponentUpdate(p, s, c) {

            const {page} = p.match.params;
            //  alert(page);
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

            const {page} = p.match.params;
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