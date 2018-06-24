<template>
    <input  v-model="value" size="small" :placeholder="'请输入'+ColumnConfig.DisplayName"  />
</template>

<script lang="ts">
import basecol from "./basecol.vue";
export default {
  mixins: [basecol as any]
};
</script>

<style>
</style>
