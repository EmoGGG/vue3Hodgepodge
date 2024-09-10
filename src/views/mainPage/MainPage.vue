<script lang="ts" setup>
import MenuColumn from './MenuColumn.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="mainP">
    <div class="menu">
      <MenuColumn></MenuColumn>
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive include="oaTreee"> <component :is="Component" /> </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mainP {
  display: flex;
  height: 100%;
  min-width: 100%;
  align-items: stretch;
  background-color: #f4f4f5;
  .menu {
    width: 300px;
    margin-right: 4px;
  }
  .content {
    flex: 1;
  }
}
</style>
