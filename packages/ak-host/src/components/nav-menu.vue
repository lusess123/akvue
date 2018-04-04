<template>
    <li :class="{active: isActive}">
      <a class="pointer" @click="toggle">
        <i class="fa" :class="config.icon"></i> 
        <span class="nav-label">{{config.text}}</span>
        <span class="fa arrow" v-if="hasChildren"></span>
      </a>
      <ul class="nav nav-second-level" :class="collapse" v-if="hasChildren">
        <li v-for="child in config.children" :key="child.name" :class="{active: isSubActive(child.name)}"><a @click="goto(child.name)">{{child.text}}</a></li>
      </ul>
    </li>
</template>

<script>
export default {
  props: {
    config: Object
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    isActive () {
      if (this.hasChildren) {
        return this.active
      }
      return this.config.name === this.$store.state.route.name
    },
    collapse () {
      return this.active ? 'collapse in' : 'collapse'
    },
    hasChildren () {
      return this.config.children && this.config.children.length
    }
  },
  methods: {
    toggle () {
      if (this.hasChildren) {
        this.active = !this.active
      } else {
        this.$store.commit('setActive', this.config.name)
        this.$router.push({name: this.config.name})
      }
    },
    goto (name) {
      this.$store.commit('setActive', name)
      this.$router.push({name: name})
    },
    isSubActive (name) {
      return name === this.$store.getters.nav.active
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
