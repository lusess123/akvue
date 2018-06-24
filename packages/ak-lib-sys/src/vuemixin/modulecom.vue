<template>
    <h1>{{vStore().Title}}</h1>
</template>

<script lang="ts">
import * as core from "./../core";

export default {
    
  data() {
    return {
      VUniId: "VUniId" + core.getUniId()
    };
  },
  methods: {
    vStore() {
      if (this.$store && this.$store.state) {
        return this.$store.state[this.VUniId];
      } else {
        return null;
      }
    },
    distoryModule() {
      return true;
    },
    fetchVUniId(){
        if (this.$store) {
             this.$store.unregisterModule(this.VUniId);
         }
        this.VUniId = "VUniId" + core.getUniId();
        this.$store.registerModule(this.VUniId, this.getModule());

    }
  },

  created() {
    //console.log("created");
    // console.log(this.$store);
    if (!this.VUniId) {
      this.VUniId = "VUniId" + core.getUniId();
    }
    this.$store.registerModule(this.VUniId, this.getModule());
    //alert(this.VUniId);
    window["ggg"] = this.$store;
  },

  destroyed() {
    if (this.$store) {
      this.$store.unregisterModule(this.VUniId);
    }
  }
};
</script>

<style>
</style>
