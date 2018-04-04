<template>
  <div id="wrapper">
    <nav-bar></nav-bar>
    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
              <a class="navbar-minimalize minimalize-styl-2 btn btn-primary "><i class="fa fa-bars"></i> </a>
              <div class="navbar-form-custom">
                <v-breadcrumb></v-breadcrumb>
              </div>
          </div>
          <v-header></v-header>
        </nav>
      </div>
      <div class="wrapper wrapper-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/nav'
import vHeader from '@/components/header'
import vBreadcrumb from '@/components/bread'
export default {
  components: {navBar, vHeader, vBreadcrumb}
}
</script>

<style scoped>
  .wrapper.wrapper-content {
    min-height: calc(100vh - 1px);
    padding: 0px 5px 20px;
  }
  .navbar-form-custom {
    padding: 20px 10px;
    width: auto;
  }
</style>

