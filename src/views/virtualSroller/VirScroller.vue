<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps<{
  allArray: any[]
  itemH: number
  contentHeight: number | string
  idName: string
}>()
let tempA = defineModel('tempA')
let heightArray = defineModel('heightArray')
let fullHeight = computed(() => {
  return Object.values(heightArray.value as heightType).reduce((sum1, item) => {
    return sum1 + item
  }, 0)
})
let containerHeight = computed(() => {
  if (!scrollItem.value) return 0
  else {
    return scrollItem.value.offsetHeight
  }
})

interface heightType {
  [key: string]: number
}
let scrollItem = ref<HTMLDivElement>()
let tsltY = ref<number>(0)
const getHeight = (index: number) => {
  if (index >= props.allArray.length) return 10000 ///有问题
  if ((heightArray.value as heightType)[props.allArray[index][props.idName]])
    return (heightArray.value as heightType)[props.allArray[index][props.idName]]
  else {
    return props.itemH
  }
}
const setHeight = (index: number, h: number) => {
  ;(heightArray.value as heightType)[props.allArray[index][props.idName]] = h
}
const handlerScroll = (e: Event) => {
  if (!e.target) return
  let div = e.target as HTMLDivElement
  let h1 = getHeight(0)
  let h2 = getHeight(1)
  if (div.scrollTop < h1 + h2) {
    //前两个没位置放时  刷新直接更新  passedIndex就是最新的firstIndex
    tsltY.value = div.scrollTop
    //确定firstIndex
    let firstIndex
    if (div.scrollTop - h1 < 0) {
      firstIndex = 0
    } else {
      firstIndex = 1
    }
    //确定能够容纳多少元素 也就确定了endIndex
    let endIndex = firstIndex - 1
    let sum = 0
    while (sum < containerHeight.value) {
      endIndex++
      sum += getHeight(endIndex)
    }
    endIndex = endIndex + 5
    tempA.value = props.allArray.slice(firstIndex, endIndex)
  } else {
    //根据heightArray寻找firstIndex
    let tempIndex = -1
    let sum = 0
    while (sum < div.scrollTop) {
      tempIndex++
      sum += getHeight(tempIndex)
    }
    let firstIndex = tempIndex - 2
    //确定tsltY
    tsltY.value = div.scrollTop - getHeight(firstIndex) - getHeight(firstIndex + 1)
    //确定endIndex
    tempIndex = tempIndex - 1
    sum = 0
    while (sum < containerHeight.value) {
      tempIndex++
      sum += getHeight(tempIndex)
    }
    let endIndex = tempIndex + 3
    tempA.value = props.allArray.slice(firstIndex, endIndex)
  }
  //更新fullHeight  优化为computed
}

// const subHeight = (h: any, i: number) => {
//   heightArray.value[i] = h
// } //搜集高度
onMounted(() => {
  console.log(containerHeight)
  for (let i = 0; i < props.allArray.length; i++) {
    setHeight(i, props.itemH)
  }
  tempA.value = props.allArray.slice(0, Math.ceil(containerHeight.value / props.itemH) + 4)
})
</script>
<template>
  <div
    class="scrollContainer"
    ref="scrollItem"
    @scroll="handlerScroll"
    :style="{ height: typeof contentHeight === 'number' ? contentHeight + 'px' : 100 + '%' }"
  >
    <div class="contentFull" :style="{ height: fullHeight + 'px' }"></div>
    <div class="itemListContainer" :style="{ transform: 'translateY(' + tsltY + 'px)' }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scrollContainer {
  position: relative;
  width: 100%;
  overflow-y: auto;
  .itemListContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
