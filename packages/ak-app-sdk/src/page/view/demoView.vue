<template>
    <Card>
        <div>Pro:{{getPro}}</div>
        <div>属性：{{vm}}</div>
        <div>属性getVm：{{getVm}}</div>
        <div>计算属性：{{getProCompute}}</div>
        <div>子类计算属性：{{computedMsg}}</div>
        <div>函数：{{getDate()}}</div>
        <div>{{xxx()}}</div>
        <Button @click="f5">刷新</Button>
    </Card>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { core, ioc, vue, util } from "ak-lib-sys";
import { IView } from "./IView"

const name: string = "xxx";

@Component
export class BaseVueDom<T> extends Vue {
    @Prop()
    vm: T;
    get computedMsg() {
        return core.json(this.vm);
    }

    f5() {
        window["xxx"] = this ;
        core.alert("base刷新");
        this.$forceUpdate();
    }
}

@Component({
    computed: {
        getList() {
            return this.Pro;
        }
    }
})
export default class DemoView extends BaseVueDom<IView>
{
     @Prop({default:{Title:"aaa123"}})
     vm = {Title:"aaa123"};
    @Prop()
    Pro: string ;

    AA: string = "123";

    getDate() {
        return new Date().toString() ;
    }
    [name]() {
        return this.vm.Title;
    }

    get getProCompute()
    {
        return this.Pro ;
    }

    get getPro(){
        return new Date().toString() + this.Pro;
    }
   get getVm(){
            return this.vm.Title ;
        }

    f5() {
        window["vvv"] = this ;
        // super.f5();
       // this.$set(this.vm,"Title",new Date().toString());
       this.Pro =   new Date().toString();
       this.vm.Title = this.Pro ;
       //this.vm = {...this.vm ,...{Title: new Date().toString()}};
     // this.vm.change();
      
        //core.alert("子类刷新");
        //this.$forceUpdate();
    }
}



</script>

<style>

</style>
