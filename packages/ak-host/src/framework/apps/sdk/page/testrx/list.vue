<template>
  <Card>

    <hr/>
    <aa :btnText="getCol()"></aa>
    {{c}} {{getC}}
  </Card>

</template>

<script lang="ts">

import Vue from "vue";


import items1 from "./item1.vue";
import items from "./items.vue";
import test from "./test.vue";

export default {
  components: { aa:items1 },
  props: ["List", "b", "c"],
  
  inject: ["UniId"],
  data() {
    return {
      DataList: [
        { Index: 1, Text: "Text1" },
        { Index: 2, Text: "Text2" },
        { Index: 3, Text: "Text3" },
        { Index: 4, Text: "Text4" },
        { Index: 5, Text: "Text5" }
      ]
    };
  },
  
  methods: {
    getList() {
      alert("getList");
      return this.List.a.filter(a => a.Index >= 3).map((a) => {
        return a;
      });
      //return this.DataList.filter(a=>a.Index > 3);;
    },
    getCol() {
      return "1111";
    }


  },
  computed: {
    list() {
      alert("list");
      window["xxList"] = this;
      return this.List;
    },
    getC() {
      return this.c;
    }
  },
  mounted() {
    alert("list.vue 渲染完成...");
    window["list"] = this;
  },
  updated() {
    alert("list.vue 更新了");
  }
};
</script>

<style>

</style>
