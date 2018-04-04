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
var dwh_permission = /** @class */ (function () {
    function dwh_permission() {
    }
    __decorate([
        Column({ DisplayName: "单号" }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "id", void 0);
    __decorate([
        Column({ DisplayName: "", Search: { IsNavi: true }, Options: { RegName: "_subscriptionsTabNavi" }, ControlType: "Tab", ShowPage: "None" }),
        __metadata("design:type", Number)
    ], dwh_permission.prototype, "tab", void 0);
    __decorate([
        Column({ DisplayName: "数据源" }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "source_name", void 0);
    __decorate([
        Column({ DisplayName: "表名" }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "table_name", void 0);
    __decorate([
        Column({ DisplayName: "集群名" }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "cluster_name", void 0);
    __decorate([
        Column({ DisplayName: "订阅类型", ControlType: "radio", Options: { RegName: "permission" } }),
        __metadata("design:type", Number)
    ], dwh_permission.prototype, "type", void 0);
    __decorate([
        Column({ DisplayName: "申请时间", Search: { ControlType: "DateTime" } }),
        __metadata("design:type", Number)
    ], dwh_permission.prototype, "apply_time", void 0);
    __decorate([
        Column({ DisplayName: "订阅名", Search: {} }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "name", void 0);
    __decorate([
        Column({ DisplayName: "授权账号" }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "auth_user_name", void 0);
    __decorate([
        Column({ DisplayName: "权限级别", Options: { RegName: "permission_level" }, Search: {}, ControlType: "radio" }),
        __metadata("design:type", String)
    ], dwh_permission.prototype, "level", void 0);
    __decorate([
        Column({ DisplayName: "处理结果", Options: { RegName: "permission_state" }, Search: {}, ControlType: "radio" }),
        __metadata("design:type", Number)
    ], dwh_permission.prototype, "state", void 0);
    return dwh_permission;
}());
export { dwh_permission };
