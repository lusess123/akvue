/**
 * 带有主键的数据
 *
 * @export
 * @interface IId
 */
export interface IId {
    id?: string;
}
/**
 * 基本行数据
 *
 * @export
 * @interface IBaseRow
 * @extends {IId}
 */
export interface IBaseRow extends IId {
    create_time?: number;
    update_time?: number;
}
export interface IPage {
    total?: number;
    page?: number;
    size?: number;
}
export interface IResp<T> {
    data?: T;
    error?: number;
}
/**
 * 对某个表查询请求的参数
 *
 * @export
 * @interface IGetReq
 */
export interface IGetReq {
    /**
     * 分页页码，从0开始
     *
     * @type {number}
     * @memberof IGetReq
     */
    page?: number;
    /**
     * 页大小，默认是 10
     *
     * @type {number}
     * @memberof IGetReq
     */
    size?: number;
    order_field?: string;
    /**
     * 排序方式(DESC/ASC)，默认是DESC
     *
     * @type {string}
     * @memberof IGetReq
     */
    order?: string;
    /**
     * 查询某特定字段，多个字段用逗号分割，如：fields=name,user,department
     * 默认是全部字段
     * @type {string}
     * @memberof IGetReq
     */
    fields?: string;
    /**
     * 按指定条件查询，多个查询条件用逗号分割，如：query=user:zhangsan,department:devops
     * 默认是“”
     * @type {string}
     * @memberof IGetReq
     */
    query?: string;
    tab?: any;
}
