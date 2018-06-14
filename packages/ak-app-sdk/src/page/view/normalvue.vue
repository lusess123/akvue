<template>
  <h1>ddd123{{vm.aaa}}</h1>
</template>

<script  lang="ts">
import { vue } from "ak-lib-sys/src";
export default   vue.create( {
    name :"normalvue",
    props:["vm"]
});

</script>

<style>

</style>
