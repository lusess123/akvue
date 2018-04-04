<template>
  <li class="nav-header">
    <div class="dropdown profile-element">
      <div class="nav-avatar">
        <img alt="image" class="img-circle" src="../../src/assets/img/logo.png" />
      </div>
      <Dropdown trigger="click" @on-click="jump">
        <a data-toggle="dropdown" class="dropdown-toggle">
          <span class="clear"> 
            <span class="block m-t-xs"> 
              <strong class="font-bold">{{UserName}}</strong>
            </span> 
            <span class="text-muted text-xs block">{{JobDesc}} <b class="caret"></b>
            </span> 
          </span>
        </a>
        <DropdownMenu slot="list" divided>
            <DropdownItem v-for="item in navDropdown" :key="item.name" :name="item.action">
              <span>{{item.name}}</span>
            </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="logo-element">
      绿湾云平台 
    </div>
  </li>
</template>

<script>
import userApi from '@/requests/user.http'
export default {
  computed: {
    navDropdown () {
      return this.$store.getters.nav.dropdown
    },
    UserName () {
      return this.$store.state.auth.user.Name || ''
    },
    JobDesc () {
      return this.$store.state.auth.user.Title || '绿湾工程师'
    }
  },
  methods: {
    jump (action) {
      if (action) {
        userApi[action]()
      }
    }
  }
}
</script>

<style scoped>
  .nav-header .profile-element {
    text-align: center;
  }
  .nav-header .nav-avatar {
    height: 48px;
  }
  .img-circle {
    height: 48px;
  }
</style>
