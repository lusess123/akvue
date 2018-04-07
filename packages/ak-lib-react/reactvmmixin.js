import reactvue from './reactvuemixin';
export default {
    mixins: [reactvue],
    props: ["Vm", "ReactType"],
    //  template: '<div></div>',
    methods: {
        getReactProps: function () {
            return this.$props.Vm;
        },
        getReactType: function () {
            return this.$props.ReactType;
        }
    },
    watch: {
        Vm: {
            handler: function (val, oldVal) {
                /* ... */
                this.reactrender();
            },
            deep: true
        },
    }
};
