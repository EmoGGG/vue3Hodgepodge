<script lang="ts" setup>
import NodeWrap from './NodeWrap.vue'
import { ref } from 'vue'
interface box {
  type: number
  boxChildList?: box[][]
}
let boxList = ref<box[]>([{ type: 1 }])
</script>
<template>
  <div class="test">
    <NodeWrap :isChild="false" v-model="boxList"></NodeWrap>
  </div>
</template>

<style lang="less" scoped>
.test {
  height: 100%;
  background-color: white;
  padding: 20px;
}
</style>
