<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{
  num: number
  content: string
}>()
// const emits = defineEmits<{
//   (e: 'subHeight', h: number): void
// }>()
// onMounted(() => {
//   console.log('ini', props.num)
//   setTimeout(() => {
//     emits('subHeight', props.num)
//   }, 30)
// })
// onUnmounted(() => {
//   console.log('des', props.num)
// })
</script>
<template>
  <div :style="{ height: num + 'px' }" :class="{ gg: parseInt(content) % 2 === 1 }">
    {{ content }}
  </div>
</template>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
div {
  text-align: center;
}
.gg {
  color: white;
  background-color: rgb(73, 66, 66);
}
</style>
