<template>
<h1>UniId Mixxin</h1>
</template>

<script>
export default {
 // inject: ["UniId"],
 inject: {
    UniId: { default: '' }
  },
  methods: {
    getCurrentState$() {
      return this.$store.state[this.UniId];
    }
  }
};
</script>

<style>

</style>
