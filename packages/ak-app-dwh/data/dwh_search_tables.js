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
export class dwh_search_tables {
}
__decorate([
    Column({ DisplayName: "编号", ControlType: "Hidden" }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "id", void 0);
__decorate([
    Column({ DisplayName: "英文名", Search: {} }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "name", void 0);
__decorate([
    Column({ DisplayName: "中文名" }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "cnname", void 0);
__decorate([
    Column({ DisplayName: "集群名称" }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "cluster_name", void 0);
__decorate([
    Column({ DisplayName: "负责人" }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "owner_name", void 0);
__decorate([
    Column({ DisplayName: "更新时间", ControlType: "DateTime" }),
    __metadata("design:type", Number)
], dwh_search_tables.prototype, "update_time", void 0);
__decorate([
    Column({ DisplayName: "描述" }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "description", void 0);
__decorate([
    Column({ DisplayName: "数据源名称", Width: "110", Search: {} }),
    __metadata("design:type", String)
], dwh_search_tables.prototype, "source_name", void 0);
__decorate([
    Column({ DisplayName: "级别", ControlType: "radio", Options: { RegName: "table_level" } }),
    __metadata("design:type", Number)
], dwh_search_tables.prototype, "level", void 0);
__decorate([
    Column({ DisplayName: "订阅数" }),
    __metadata("design:type", Number)
], dwh_search_tables.prototype, "total_sub_count", void 0);
