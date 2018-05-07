import {BasePage, BaseDom} from './../dockcloud/mobx/base'
import * as ioc from 'ak-lib-sys/Ioc'
import React, {FormEvent} from 'react'
import ui from './../../common/baseui'
const {Button, Col, Row, Input} = ui;
import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx'

interface IProps
{
    Name : string;
    Title : string;
}
const component1 : React.SFC < IProps > = (props) => {
    return <div title={props.Title}>{props.Name}</div>
}

@observer
export class CodePageReact extends BaseDom < CodePage > {

    pRender() {
        return <div>
            <Row>
                <Input
                    value={this.vm.RegName}
                    onChange={(e) => {
                    this._changeText(e)
                }}></Input>
            </Row>
            <Row style={{
                height: "1rem"
            }}></Row>
            <Row><Input.TextArea autosize={true} value={this.vm.Tpl}/></Row>
        </div>
    }

    private _changeText(e : FormEvent < HTMLInputElement >) {
        this.vm.RegName = (e.target)["value"];
    }
}

@ioc.PlugIn({RegName: "CodePage", BaseType: "BasePage"})
export class CodePage extends BasePage {
    ReactType = CodePageReact;
    @observable public RegName : string = "123";
    @computed public get Tpl() {
        return _pageTpl(this.RegName);
    }

    loadData() {
        this.RegName = this.P1;
        // const schema = makeSchema(Query, {     types: [Size, Box]   });
        // console.log(schema);
    }

}

const _pageTpl = (regName) => {
    return `
    import {BasePage, BaseDom} from './../dockcloud/mobx/base'
    import * as ioc from 'ak-lib-sys/Ioc'
    import React from 'react'
    import ui  from './../../common/baseui'
    const { Button , Col, Row,Input } = ui ;
    
    
    export class ${regName}PageReact extends BaseDom <${regName}Page> {
        pRender() {
            return <div>
                   <Row><Col>{${regName}}</Col></Row>
                  
            </div>      
        }
    }
    
    @ioc.PlugIn({RegName: "${regName}Page", BaseType: "${regName}Page"})
    export class ${regName}Page extends BasePage {
        ReactType = ${regName}PageReact;
    
        loadData(){ 
        }
    }
    
    `;
}
