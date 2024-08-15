<script lang="ts" setup>
import { mainChildren } from '@/router'

import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()

interface menuItem {
  name: string
  path: string
}
let menuItemList = ref<menuItem[]>([])
let index = ref<number>(-1)

const gotoPage = (i: number, path: string, query: any = {}) => {
  index.value = i
  router.push({
    path,
    query
  })
}

onBeforeMount(() => {
  if (mainChildren)
    mainChildren.forEach((item) => {
      let { name, path } = item
      menuItemList.value.push({ name, path })
    })
})
</script>
<template>
  <div class="columnContainer">
    <div
      class="menuItem"
      :class="{ active: i === index }"
      v-for="(item, i) in menuItemList"
      :key="item.name"
      @click="gotoPage(i, item.path)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.columnContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: stretch;
  background-color: white;
  .menuItem {
    text-align: center;
    padding: 4px;
    font-size: 18px;
    margin: 4px;
    background-color: #dedfe0;
    &.active {
      color: #409eff;
      background-color: #303133;
    }
    &:hover {
      color: #409eff;
      cursor: pointer;
      background-color: #303133;
    }
  }
}
</style>
