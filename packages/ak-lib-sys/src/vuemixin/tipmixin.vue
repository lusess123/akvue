<template>
  
</template>

<script>
import * as $ from "jquery";
import * as util from "./../Util";
export default {

  methods:{
        getvm$(){
          return this.$props.vm;
      }
  },
   
  mounted: function() {
  //  alert("控件完成了");
   // debugger;
    this.vm.$store = this.$store;
    //if (this.$props.vm) {
      
      if (this.$props.vm) {
        // debugger;
        const _msd = this.$props.vm.MesgList
          ? this.$props.vm.MesgList
          : { List: [] };
        if (this.$el) {
          if (this.$el) {
            var _$dom = $(this.$el);
            if (_$dom) {
              // core.alert(_msd);
              const me = this;
              if (!window["aaa"]) window["aaa"] = this;
              _$dom.off("mousedown").on("mousedown", function(event) {
                event.stopPropagation();
                if (event["which"] == 3) {
                  // debugger;
                  console.log("定位组件:");
                  console.log({_0vm:me.$props.vm,_1com:me});
                  event.stopPropagation();
                  const _$t = $(this);
                  if (!_$t.hasClass("acs-module-warning")) {
                    $(this).addClass("acs-module-warning");
                    //var _lis = "<li><pre>"+ util.safeJson (me.vm,null,2)+"</pre></li>";
                    let _lis = "";
                    if (_msd.List) {
                      _msd.List.forEach(l => {
                        _lis += "<li>" + l + "</li>";
                      });
                    }

                    var _$p = $(
                      "<div class='acs-module-warninHg-content acs-mesg '><div>" +
                        util.getFunName(me.vm.constructor) +
                        "</div><div class='ivu-card-body'>" +
                        "</div><ul class='list'>" +
                        _lis +
                        "</ul></div>"
                    );

                    $("body").append(_$p);
                    _$p.css({
                      top: event.clientY,
                      left: event.clientX,
                      "z-index": 1010
                    });
                    _$t.data("div", _$p);
                    // me.$el["div"] = _$p;
                    _$t.addClass("borderError");
                  } else {
                    _$t.removeClass("acs-module-warning  borderError ");
                    // me.$el["div"] = undefined;
                    _$t.data("div").remove();
                  }

                  return false;
                }
              });
            }
          }
        }
      }
   // }
  },
  beforeDestroy() {
    const _$t = $(this.$el);
    //  if(this.$el["div"]){
    _$t.removeClass("acs-module-warning  borderError ");
    // me.$el["div"] = undefined;
    if (_$t.data("div")) _$t.data("div").remove();
    //  }
  }
}
</script>

<style>

</style>
