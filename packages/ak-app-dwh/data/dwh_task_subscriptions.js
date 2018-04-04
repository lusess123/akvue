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
var dwh_task_subscriptions = /** @class */ (function () {
    function dwh_task_subscriptions() {
    }
    __decorate([
        Column({ DisplayName: "编号", ControlType: "Hidden" }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "id", void 0);
    __decorate([
        Column({ DisplayName: "订阅名", Search: {} }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "name", void 0);
    __decorate([
        Column({ DisplayName: "订阅者", Search: {} }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "owner_cnname", void 0);
    __decorate([
        Column({ DisplayName: "优先级" }),
        __metadata("design:type", Number)
    ], dwh_task_subscriptions.prototype, "priority", void 0);
    __decorate([
        Column({ DisplayName: "订阅类型", Search: {}, ControlType: "radio", Options: { RegName: "permission" } }),
        __metadata("design:type", Number)
    ], dwh_task_subscriptions.prototype, "type", void 0);
    __decorate([
        Column({ DisplayName: "订阅状态", Search: {}, ControlType: "radio", Options: { RegName: "subscriptionsState" } }),
        __metadata("design:type", Number)
    ], dwh_task_subscriptions.prototype, "state", void 0);
    __decorate([
        Column({ DisplayName: "订阅事件" }),
        __metadata("design:type", Number)
    ], dwh_task_subscriptions.prototype, "sub_time", void 0);
    __decorate([
        Column({ DisplayName: "表名", Search: {} }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "table_name", void 0);
    __decorate([
        Column({ DisplayName: "数据源" }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "source_name", void 0);
    __decorate([
        Column({ DisplayName: "描述" }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "description", void 0);
    __decorate([
        Column({ DisplayName: "延迟" }),
        __metadata("design:type", String)
    ], dwh_task_subscriptions.prototype, "delay", void 0);
    return dwh_task_subscriptions;
}());
export { dwh_task_subscriptions };
