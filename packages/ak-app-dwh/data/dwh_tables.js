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
export class dwh_tables {
}
__decorate([
    Column({ DisplayName: "编号", ControlType: "Hidden" }),
    __metadata("design:type", String)
], dwh_tables.prototype, "id", void 0);
__decorate([
    Column({ DisplayName: "表名", Search: {}, IsRequire: true }),
    __metadata("design:type", String)
], dwh_tables.prototype, "name", void 0);
__decorate([
    Column({ DisplayName: "中文名", Search: {}, IsRequire: true }),
    __metadata("design:type", String)
], dwh_tables.prototype, "cnname", void 0);
__decorate([
    Column({ DisplayName: "", Search: { IsNavi: true }, Options: { RegName: "_TableTabNavi" }, ControlType: "Tab", ShowPage: "None" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "tab", void 0);
__decorate([
    Column({ DisplayName: "集群", IsRequire: true, ShowPage: "OnlyEdit" }),
    __metadata("design:type", String)
], dwh_tables.prototype, "cluster_id", void 0);
__decorate([
    Column({ DisplayName: "所属集群", ShowPage: "OnlyRead" }),
    __metadata("design:type", String)
], dwh_tables.prototype, "cluster_name", void 0);
__decorate([
    Column({ DisplayName: "创建时间", ShowPage: "OnlyRead" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "create_time", void 0);
__decorate([
    Column({ DisplayName: "物理存储", ShowPage: "OnlyRead", }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "storage", void 0);
__decorate([
    Column({ DisplayName: "描述", ShowPage: "OnlyEdit", ControlType: "textarea" }),
    __metadata("design:type", String)
], dwh_tables.prototype, "description", void 0);
__decorate([
    Column({ DisplayName: "生命周期", ShowPage: "OnlyEdit", IsRequire: true, Options: { RegName: "table_lifetime" }, ControlType: "radio" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "lifetime", void 0);
__decorate([
    Column({ DisplayName: "实时订阅数", ShowPage: "OnlyRead" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "realtime_sub_count", void 0);
__decorate([
    Column({ DisplayName: "离线订阅数", ShowPage: "OnlyRead" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "offline_sub_count", void 0);
__decorate([
    Column({ DisplayName: "数据源名称", ShowPage: "None" }),
    __metadata("design:type", String)
], dwh_tables.prototype, "source_name", void 0);
__decorate([
    Column({ DisplayName: "级别", ShowPage: "None" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "level", void 0);
__decorate([
    Column({ DisplayName: "订阅类型", Search: {}, Options: { RegName: "permission" }, ControlType: "radio", ShowPage: "None" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "permission", void 0);
__decorate([
    Column({ DisplayName: "字段信息", ShowPage: "OnlyEdit", ControlType: "TableData" }),
    __metadata("design:type", String)
], dwh_tables.prototype, "schema", void 0);
__decorate([
    Column({ DisplayName: "是否分区", Search: {}, Options: { RegName: "part" }, ControlType: "radio", ShowPage: "OnlyEdit" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "part", void 0);
__decorate([
    Column({ DisplayName: "标签", ShowPage: "None" }),
    __metadata("design:type", Number)
], dwh_tables.prototype, "tags", void 0);
