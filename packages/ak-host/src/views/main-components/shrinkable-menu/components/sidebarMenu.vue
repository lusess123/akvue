<style lang="less">
@import "../styles/menu.less";
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.path" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <Submenu v-if="item.children &&item.children.length >= 1" :name="item.name" :key="item.name">
                <template slot="title">
                  
                    <i class="fa" :class="getIcon(item)"></i> 
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <i class="fa" :class="getIcon(child)" :key="'icon' + child.name"></i> 
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
               <MenuItem v-else :name="item.name" :key="'menuitem' + item.name">
                        <i class="fa" :class="getIcon(item)" :key="'icon' + item.name"></i> 
                        <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item) }}</span>
                    </MenuItem>
        </template>
    </Menu>
</template>

<script>
export default {
  name: "sidebarMenu",
  props: {
    menuList: Array,
    iconSize: Number,
    menuTheme: {
      type: String,
      default: "dark"
    },
    openNames: {
      type: Array
    }
  },
  methods: {
    changeMenu(active) {
      this.$emit("on-change", active);
    },
    itemTitle(item) {
      if (typeof item.title === "object") {
        return this.$t(item.title.i18n);
      } else {
        if (item.title) {
          return item.title;
        } else {
          return item.meta.title;
        }
      }
    },
    getIcon(item) {
      return "fa-" + (item.icon ? item.icon : "compose");
    }
  },
  updated() {
    //alert();
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        //updateActiveName
        this.$refs.sideMenu.updateActiveName();
        this.$refs.sideMenu.updateOpened();
      }
    });
  }
};
</script>
