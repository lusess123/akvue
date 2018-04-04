var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column } from "ak-lib-biz/contract/TableMeta";
var dwh_HostComputer = /** @class */ (function () {
    function dwh_HostComputer() {
    }
    __decorate([
        Column({ DisplayName: "主键编号", ControlType: "hidden" }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "id", void 0);
    __decorate([
        Column({ DisplayName: "状态" }),
        __metadata("design:type", Number)
    ], dwh_HostComputer.prototype, "state", void 0);
    __decorate([
        Column({ DisplayName: "名称", Search: {} }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "cnname", void 0);
    __decorate([
        Column({ DisplayName: "角色" }),
        __metadata("design:type", Number)
    ], dwh_HostComputer.prototype, "role", void 0);
    __decorate([
        Column({ DisplayName: "上一检测信号", Width: "100" }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "lastcheck", void 0);
    __decorate([
        Column({ DisplayName: "平均负载" }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "avgload", void 0);
    __decorate([
        Column({ DisplayName: "磁盘使用情况" }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "diskuser", void 0);
    __decorate([
        Column({ DisplayName: "物理内存" }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "phymomery", void 0);
    __decorate([
        Column({ DisplayName: "交换空间" }),
        __metadata("design:type", String)
    ], dwh_HostComputer.prototype, "exchangespace", void 0);
    return dwh_HostComputer;
}());
export { dwh_HostComputer };
