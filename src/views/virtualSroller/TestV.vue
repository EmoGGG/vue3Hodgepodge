<script lang="ts" setup>
import VirScroller from './VirScroller.vue'
import ItemC from './ItemC.vue'
import { ref, onBeforeMount, nextTick } from 'vue'
interface test {
  height: number
  id: string
}
let allArray = ref<test[]>([])
let tempA = ref<test[]>([])
let heightArray = ref<{
  [key: string]: number
}>({})
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}
onBeforeMount(() => {
  for (let i = 0; i < 500; i++) {
    let randomNumber = Math.round(getRandomArbitrary(20, 60))
    let temp = {
      height: randomNumber,
      id: i + ''
    }
    if (allArray.value) allArray.value.push(temp)
  }
})
</script>
<template>
  <div class="test">
    <VirScroller
      :allArray="allArray"
      v-model:tempA="tempA"
      v-model:heightArray="heightArray"
      :itemH="20"
      :contentHeight="'100%'"
      idName="id"
    >
      <div
        v-for="item in tempA"
        :ref="
          (el) => {
            nextTick(() => {
              if (!el) return
              heightArray[item.id] = (el as HTMLDivElement).offsetHeight
            })
          }
        "
        :key="item.id"
      >
        <ItemC :num="item.height" :content="item.id"></ItemC>
      </div>
    </VirScroller>
  </div>
</template>

<style lang="less" scoped>
.test {
  height: 100%;
  background-color: white;
}
</style>
