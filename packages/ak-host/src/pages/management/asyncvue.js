



export default{

    culterSearch:resolve => require(['./../data_management/data_table_search.vue'], resolve),
    culterManage:resolve => require(['./cluster.vue'], resolve),
    culterNew:resolve => require(['./cluster_new.vue'], resolve)
}