<template>
<div>fff123
  <li v-for="test in list" :key="test.Index">
                <Button :btnText="test.Text"></Button>
            </li>
  </div>
</template>

<script>
import Button from "./item1.vue";
export default {
        props:['list'],
        components:{Button}
}
</script>

<style>

</style>
