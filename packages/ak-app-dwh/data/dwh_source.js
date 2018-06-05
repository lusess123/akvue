var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column } from "ak-lib-biz/contract/tablemeta";
export class dwh_source {
}
__decorate([
    Column({ DisplayName: "单号" }),
    __metadata("design:type", String)
], dwh_source.prototype, "id", void 0);
__decorate([
    Column({ DisplayName: "数据源名称", Search: {} }),
    __metadata("design:type", String)
], dwh_source.prototype, "source_name", void 0);
__decorate([
    Column({ DisplayName: "数据源类型", Search: {}, ControlType: "radio", Options: { RegName: "source_type" } }),
    __metadata("design:type", Number)
], dwh_source.prototype, "type", void 0);
__decorate([
    Column({ DisplayName: "连接信息" }),
    __metadata("design:type", String)
], dwh_source.prototype, "config", void 0);
__decorate([
    Column({ DisplayName: "数据源描述" }),
    __metadata("design:type", String)
], dwh_source.prototype, "description", void 0);
__decorate([
    Column({ DisplayName: "创建人" }),
    __metadata("design:type", String)
], dwh_source.prototype, "creator_cnname", void 0);
__decorate([
    Column({ DisplayName: "时间" }),
    __metadata("design:type", Number)
], dwh_source.prototype, "update_time", void 0);
