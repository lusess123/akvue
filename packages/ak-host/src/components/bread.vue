<template>
    <Breadcrumb>
        <BreadcrumbItem :to="{name: route.meta.redirect ? route.meta.redirect : route.name, params: route.params, query: route.query}" v-for="route in branch" :key="route.fullPath">
          {{route.meta.title}}
        </BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    update () {

    }
  },
  computed: {
    branch () {
      return this.$route.matched
    }
  },
  mounted () {}
}
</script>

