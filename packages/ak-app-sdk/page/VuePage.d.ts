import Vue from 'vue';
export declare class BaseVueDom extends Vue {
    readonly computedMsg: string;
}
export declare class VuePage extends BaseVueDom {
    msg: number;
    helloMsg: string;
    NormalVueVm: {
        aaa: string;
    };
    mounted(): void;
    greet(): void;
    readonly computedMsg1: string;
}
