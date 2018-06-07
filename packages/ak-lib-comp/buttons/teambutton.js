var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ioc, vue } from "ak-lib-sys";
import { BaseCom } from "ak-lib-sys/com/basecom";
let TeamButtonCom = class TeamButtonCom extends BaseCom {
    constructor(config) {
        super(config);
        // public MesgList = {
        //     List :[
        //           "按钮集合组件",
        //           "根据不同的按钮排列进行显示..."
        //     ]
        // }
        this.Buttons = [];
        this.IsDown = "right";
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
    get IsFirst() {
        return this.Buttons.length > 1;
    }
    changeMenu(val) {
        this.IsDown = val ? "down" : "right";
    }
    fGetFirstBtn() {
        if (this.Buttons && this.Buttons.length > 0) {
            return this.Buttons[0];
        }
    }
    clickBtn(name) {
        // alert(name);
        this.emitAppEvent("data-btn", this.UniId, {
            Name: name,
            Row: this.Data
        });
    }
};
TeamButtonCom = __decorate([
    ioc.PlugIn({ RegName: "TeamButtonCol", BaseType: "BaseCom", CreateDate: "2018-01-26", Doc: "TeamButton组件插件" }),
    vue.com(`<div>
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
            };
        },
        beforeUpdate: function () {
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
    }),
    __metadata("design:paramtypes", [Object])
], TeamButtonCom);
export { TeamButtonCom };
