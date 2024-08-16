<script lang="ts" setup>
import type { treeNodeType } from '@/constant/constant'
import { treeNodex } from '@/constant/constant'
import TreeNode from './TreeNode.vue'

import { ref } from 'vue'

let treeNode = ref<treeNodeType[] | treeNodeType>(treeNodex)
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
