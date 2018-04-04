var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { BaseCom } from "ak-lib-sys/com/BaseCom";
var TeamButtonCom = /** @class */ (function (_super) {
    __extends(TeamButtonCom, _super);
    function TeamButtonCom(config) {
        var _this = _super.call(this, config) || this;
        // public MesgList = {
        //     List :[
        //           "按钮集合组件",
        //           "根据不同的按钮排列进行显示..."
        //     ]
        // }
        _this.Buttons = [];
        _this.IsDown = "right";
        //this.changeMenu = this.changeMenu.bind(this);
        // this.IsDown = "right";
        // window["aaa"] = this;
        _this.clickBtn = _this.clickBtn.bind(_this);
        // this.setRx("IsDown",false);
        if (config) {
            _this.Buttons = config.Buttons;
            _this.FirstBtn = _this.fGetFirstBtn();
            _this.Data = config.Data;
        }
        return _this;
    }
    Object.defineProperty(TeamButtonCom.prototype, "IsFirst", {
        get: function () {
            return this.Buttons.length > 1;
        },
        enumerable: true,
        configurable: true
    });
    TeamButtonCom.prototype.changeMenu = function (val) {
        this.IsDown = val ? "down" : "right";
    };
    TeamButtonCom.prototype.fGetFirstBtn = function () {
        if (this.Buttons && this.Buttons.length > 0) {
            return this.Buttons[0];
        }
    };
    TeamButtonCom.prototype.clickBtn = function (name) {
        // alert(name);
        this.emitAppEvent("data-btn", this.UniId, {
            Name: name,
            Row: this.Data
        });
    };
    TeamButtonCom = __decorate([
        ioc.PlugIn({ RegName: "TeamButtonCol", BaseType: "BaseCom", CreateDate: "2018-01-26", Doc: "TeamButton组件插件" }),
        vue.com("<div>\n          <ButtonGroup>\n            <Button v-if=\"vm.FirstBtn\"  @click.prevent=\"vm.clickBtn(vm.FirstBtn.Name)\"  type=\"primary\"    sharp=\"circle\" size=\"small\"  >{{vm.FirstBtn.Text}}</Button>\n          \n            <Dropdown    v-if=\"vm.IsFirst\" style=\"margin-left: 20px\"    transfer  @on-visible-change=\"toggleMenu\"  @on-click=\"vm.clickBtn\" >\n            <Button shape=\"circle\" size=\"small\">\n                <Icon :type=\"'arrow-'+ ( vm.IsDown == 'down' ? 'down':'right') + '-b'\"></Icon>\n           </Button>\n            <DropdownMenu slot=\"list\"  transfer v-for=\"(btn,index) in vm.Buttons\"  :key=\"btn.Name\" >\n                <DropdownItem v-if=\"index> 0 \"    divided :name=\"btn.Name\" >{{btn.Text}}</DropdownItem>\n              \n            </DropdownMenu>\n        </Dropdown>\n        </ButtonGroup>\n         </div>", {
            data: function () {
                return {
                    IsDown: false
                };
            },
            beforeUpdate: function () {
                console.log("update");
            },
            methods: {
                toggleMenu: function (val) {
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
    return TeamButtonCom;
}(BaseCom));
export { TeamButtonCom };
