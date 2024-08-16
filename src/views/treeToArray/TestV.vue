<script lang="ts" setup>
import type { treeNodeType } from '@/constant/constant'
import { treeNodez } from '@/constant/constant'
import antiShake from '@/utils/antiShake'

import { ArrowRightBold, UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { ref, computed } from 'vue'

let nowTreeNode = computed(() => {
  return treeNodeList.value[treeNodeList.value.length - 1]
})

let treeNodeList = ref<treeNodeType[]>([treeNodez])

let consoleShake = antiShake(2000, () => {
  ElMessage.warning('该节点为末节点')
})
const gotoNextNode = (node: treeNodeType) => {
  if (node.children.length !== 0) {
    treeNodeList.value.push(node)
  } else {
    consoleShake()
  }
}
const gotoIndex = (i: number) => {
  if (i !== treeNodeList.value.length - 1) {
    treeNodeList.value = treeNodeList.value.slice(0, i + 1)
  }
}
</script>
<template>
  <div class="testC">
    <div class="topBar">
      <div
        v-for="(item, i) in treeNodeList"
        :key="item.name"
        class="topItem"
        :class="{ active: i === treeNodeList.length - 1 }"
        @click="gotoIndex(i)"
      >
        <el-icon v-if="i !== 0" style="margin: 0 5px"><ArrowRightBold /></el-icon>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="contentItem"
        v-for="item in nowTreeNode.children"
        :key="item.name"
        @click="gotoNextNode(item)"
      >
        <el-avatar
          shape="square"
          :size="40"
          :icon="UserFilled"
          style="margin: 4px; background-color: #409eff"
        />
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.testC {
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .topBar {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #c8c9cc;
    .topItem {
      display: flex;
      align-items: center;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
      &.active {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .content {
    padding: 5px;
    flex: 1;
    .contentItem {
      display: flex;
      font-size: 20px;
      align-items: center;
      &:hover {
        background-color: #dedfe0;
      }
      .name {
        flex: 1;
      }
    }
  }
}
</style>
