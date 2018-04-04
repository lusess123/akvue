<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul class="nav metismenu">
        <nav-header></nav-header>
        <nav-menu v-for="item in menu" :config="item" :key="item.name"></nav-menu>
      </ul>
    </div>
  </nav>
</template>

<script>
import navHeader from '@/components/nav-header'
import navMenu from '@/components/nav-menu'
export default {
  components: {navHeader, navMenu},
  computed: {
    menu () {
      return this.$store.getters.nav.menu
    },
    active () {
      return this.$store.getters.nav.active
    }
  }
}
</script>

