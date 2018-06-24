<template>

<pre><code>{{_getIdHashString()}} </code></pre>
    
</template>

<script lang="ts">
import * as core from "./../core";
export default {
  props: ["idhash", "VUniId"],

  computed: {
    vm() {
      this.getModule();
    }
  },

  methods: {
    _getIdHashString() {
      return core.json({ ...this.idhash, ...{ VUniId: this.VUniId } });
    },
    getModule(id?: string) {
      if (!id) {
        if (this.VUniId) {
          id = this.VUniId;
         
        }
        else {
             throw new Error("找不到 VUniId ");
        }
      }

      return this.$store.state[id];
    }
  }
};
</script>

<style>
</style>
