
import reactvue from './reactvuemixin'


export default {
    mixins:[reactvue as any],
    props: ["Vm","ReactType"],
  //  template: '<div></div>',
    methods:{
        getReactProps(){
            return this.$props.Vm;
       },
       getReactType(){
           return this.$props.ReactType;
       }

    },
    watch:{
        Vm: {
            handler: function (val, oldVal) {
                 /* ... */ 
                 this.reactrender();


                },
            deep: true
          },
    }
}