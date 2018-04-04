

import { core, ioc, vue } from "ak-lib-sys";
import { BaseCom, IBaseComConfig } from "ak-lib-sys/com/BaseCom";
import Vue from "vue";

export interface ITeamButtonComConfig extends IBaseComConfig {
    Buttons: IButton[];
    Data?: any;
}

export interface IButton {
    Name?: string;
    Text?: string;
    Disable?: boolean;
}


@ioc.PlugIn({ RegName: "TeamButtonCol", BaseType: "BaseCom", CreateDate: "2018-01-26", Doc: "TeamButton组件插件" })

@vue.com(`<div>
          <ButtonGroup>
            <Button v-if="vm.FirstBtn"  @click.prevent="vm.clickBtn(vm.FirstBtn.Name)"  type="primary"    sharp="circle" size="small"  >{{vm.FirstBtn.Text}}</Button>
          
            <Dropdown    v-if="vm.IsFirst" style="margin-left: 20px"    transfer  @on-visible-change="toggleMenu"  @on-click="vm.clickBtn" >
            <Button shape="circle" size="small">
                <Icon :type="'arrow-'+ ( vm.IsDown == 'down' ? 'down':'right') + '-b'"></Icon>
           </Button>
            <DropdownMenu slot="list"  transfer v-for="(btn,index) in vm.Buttons"  :key="btn.Name" >
                <DropdownItem v-if="index> 0 "    divided :name="btn.Name" >{{btn.Text}}</DropdownItem>
              
            </DropdownMenu>
        </Dropdown>
        </ButtonGroup>
         </div>`, {
        data() {
            return {
                IsDown: false
            }
        },
        beforeUpdate:function(){
            console.log("update");
        },

        methods: {
            toggleMenu(val) {
                // debugger;
                 //this._props.IsDown =   val ? "down" : "right";
               // Vue.set(this._props.vm,"IsDown", val ? "down" : "right");
                // Vue.set(this._props,"vm",this._props.vm);
                 this.$forceUpdate();
                 this.vm.changeMenu(val);
            }
        }
    })
export class TeamButtonCom extends BaseCom {

    // public MesgList = {
    //     List :[
    //           "按钮集合组件",
    //           "根据不同的按钮排列进行显示..."
    //     ]
 // }
    public Buttons: IButton[] = [];
    public FirstBtn: IButton;
    public IsDown: string = "right";
    public Data: any;
    public get IsFirst() {
        return this.Buttons.length > 1;
    }
    constructor(config?: ITeamButtonComConfig) {
        super(config);
        //this.changeMenu = this.changeMenu.bind(this);
       // this.IsDown = "right";
       // window["aaa"] = this;
        this.clickBtn = this.clickBtn.bind(this);
        // this.setRx("IsDown",false);
        if (config) {
            this.Buttons = config.Buttons;
            this.FirstBtn = this.fGetFirstBtn();
            this.Data = config.Data;

        }
    }

    public changeMenu(val) {
       this.IsDown = val ? "down" : "right";
      
    }

    private fGetFirstBtn() {
        if (this.Buttons && this.Buttons.length > 0) {
            return this.Buttons[0];
        }
    }

    public clickBtn(name: string) {
       // alert(name);
        this.emitAppEvent("data-btn", this.UniId, {
            Name: name,
            Row: this.Data
        });
    }

    // public clickItem(name:string){
    //     this.emitAppEvent("data-btn", this.UniId, {
    //         Name: name,
    //         Row: this.Data
    //     });
    // }

}
