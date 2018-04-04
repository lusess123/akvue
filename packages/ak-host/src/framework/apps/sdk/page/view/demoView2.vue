<template>
    <Card>
        <div>Pro:{{getPro}}</div>
        <div>属性：{{vm}}</div>
        <div>属性getVm：{{getVm}}</div>
        <div>计算属性getProCompute：{{getProCompute}}</div>
        <div>子类计算属性：{{computedMsg}}</div>
        <div>函数：{{getDate()}}</div>
        <div>getVmMethod:{{getVmMethod()}}</div>
        <Button @click="f5">刷新</Button>
    </Card>
</template>


<script lang="ts">
import { core, ioc, vue, util } from "ak-lib-sys";
import { IView } from "./IView"
export default {
    props: ["vm", "Pro","ischange"],
    computed: {
        computedMsg() {
             this.ischange ;
            return core.json(this.vm);
        },
        getProCompute() {
            return this.Pro;
        },

        getPro() {
            return new Date().toString() + this.Pro;
        },
        getVm() {
            // this.ischange = new Date().toString();
            this.ischange ;
            return this.vm.Title;
        }
    },
    methods: {
        getDate() {
            return new Date().toString();
        },

        getList() {
            return this.Pro;
        },

        getVmMethod() {
            return this.vm.Title;
        },

        f5() {
            window["vvv"] = this;
            // super.f5();
            // this.$set(this.vm,"Title",new Date().toString());
            //this.Pro = new Date().toString();
          this.ischange =   this.vm.Title = new Date().toString();
            //this.vm = {...this.vm ,...{Title: new Date().toString()}};
            // this.vm.change();

            //core.alert("子类刷新");
            this.$forceUpdate();
        }

    }

}
</script>

<style>

</style>
