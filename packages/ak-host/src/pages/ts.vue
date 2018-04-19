<template>
  <div>
      <h1>react页面</h1>
  </div>
</template>

<script lang="ts">
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ts from './tscomp'

export default {
        mounted: function () {
            const dd :string = "123";
             ReactDOM.render(React.createElement(ts.gg, null, "reactvuemixin12323"), this.$el);
        }
}
</script>

<style>

</style>

