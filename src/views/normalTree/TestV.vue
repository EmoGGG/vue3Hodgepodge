<script lang="ts" setup>
import TreeNode from './TreeNode.vue'
import { onBeforeMount, ref } from 'vue'

interface treeNodeType {
  name: string
  children: treeNodeType[]
}
let treeNode = ref<treeNodeType[] | treeNodeType>()
let treeNode0: treeNodeType
let treeNode1: treeNodeType
let treeNode2: treeNodeType
let treeNode3: treeNodeType
let treeNode4: treeNodeType
let treeNode5: treeNodeType
let treeNode6: treeNodeType

onBeforeMount(() => {
  treeNode0 = {
    name: 'treeNode0',
    children: []
  }
  treeNode6 = {
    name: 'treeNode6',
    children: []
  }
  treeNode5 = {
    name: 'treeNode6',
    children: []
  }
  treeNode4 = {
    name: 'treeNode6',
    children: []
  }
  treeNode3 = {
    name: 'treeNode3',
    children: [treeNode4, treeNode5]
  }
  treeNode2 = {
    name: 'treeNode2',
    children: [treeNode6]
  }
  treeNode1 = {
    name: 'treeNode1',
    children: [treeNode2, treeNode3]
  }
  treeNode.value = [treeNode0, treeNode1]
})
</script>
<template>
  <div class="testContainer">
    <TreeNode :treeNode="treeNode as treeNodeType[]"></TreeNode>
  </div>
</template>

<style lang="less" scoped>
.testContainer {
  height: 100%;
  background-color: white;
}
</style>
