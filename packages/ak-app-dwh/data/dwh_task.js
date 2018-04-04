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
var dwh_task = /** @class */ (function () {
    function dwh_task() {
    }
    __decorate([
        Column({ DisplayName: "编号", ControlType: "Hidden" }),
        __metadata("design:type", String)
    ], dwh_task.prototype, "id", void 0);
    __decorate([
        Column({ DisplayName: "任务名称", Search: {} }),
        __metadata("design:type", String)
    ], dwh_task.prototype, "name", void 0);
    __decorate([
        Column({ DisplayName: "修改日期" }),
        __metadata("design:type", Number)
    ], dwh_task.prototype, "update_time", void 0);
    __decorate([
        Column({ DisplayName: "任务类型", ControlType: "radio", Options: { RegName: "task_type" }, Search: {} }),
        __metadata("design:type", Number)
    ], dwh_task.prototype, "type", void 0);
    __decorate([
        Column({ DisplayName: "责任人", Search: {} }),
        __metadata("design:type", String)
    ], dwh_task.prototype, "owner_cnname", void 0);
    __decorate([
        Column({ DisplayName: "状态", ControlType: "radio", Options: { RegName: "task_state" }, Search: {} }),
        __metadata("design:type", Number)
    ], dwh_task.prototype, "state", void 0);
    __decorate([
        Column({ DisplayName: "报警设置" }),
        __metadata("design:type", String)
    ], dwh_task.prototype, "alarm_config", void 0);
    __decorate([
        Column({ DisplayName: "集群" }),
        __metadata("design:type", String)
    ], dwh_task.prototype, "culster", void 0);
    __decorate([
        Column({ DisplayName: "我的任务", ControlType: "radio", Options: { RegName: "yesOrNo" }, Search: {} }),
        __metadata("design:type", Number)
    ], dwh_task.prototype, "isown", void 0);
    return dwh_task;
}());
export { dwh_task };
