<script lang="ts" setup>
import { CaretBottom, CaretRight } from '@element-plus/icons-vue'
import TreeNode from './TreeNode.vue'
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
  treeNode: treeNodeType | treeNodeType[]
}>()

interface treeNodeType {
  name: string
  children: treeNodeType[]
}
let isStrech = ref<boolean>(false)
let isArray = ref<boolean>()

onBeforeMount(() => {
  if (props.treeNode instanceof Array === true) {
    isArray.value = true
    console.log(props.treeNode)
  } else {
    isArray.value = false
    console.log(props.treeNode)
  }
})
</script>
<template>
  <div v-if="isArray">
    <TreeNode
      v-for="item in treeNode as treeNodeType[]"
      :treeNode="item"
      :key="item.name"
    ></TreeNode>
  </div>
  <div v-else>
    <div class="treeNode" @click="isStrech = !isStrech">
      <el-icon>
        <CaretBottom v-if="(treeNode as treeNodeType).children.length > 0" v-show="isStrech" />
        <CaretRight v-if="(treeNode as treeNodeType).children.length > 0" v-show="!isStrech" />
      </el-icon>
      <div class="name">
        <div class="rName">{{ (treeNode as treeNodeType).name }}</div>
      </div>
    </div>
    <el-collapse-transition>
      <TreeNode
        id="fadeItem"
        style="margin-left: 16px"
        v-if="(treeNode as treeNodeType).children.length !== 0 && isStrech"
        :treeNode="(treeNode as treeNodeType).children"
      ></TreeNode>
    </el-collapse-transition>
  </div>
</template>

<style lang="less" scoped>
.treeNode {
  display: flex;
  align-items: center;
  font-size: 20px;
  &:hover {
    background-color: #dedfe0;
    cursor: pointer;
  }
  .el-icon {
    font-size: 16px;
  }
  .name {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
