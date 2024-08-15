<script lang="ts" setup>
import { defineModel, type ModelRef } from 'vue'
import NodeWrap from './NodeWrap.vue'
let props = defineProps<{
  isChild: boolean
}>()
let boxList: ModelRef<box[] | undefined, string> = defineModel()
let { isChild = false } = props
let emits = defineEmits<{
  (e: 'delList', blist: box[]): void
}>()
const onDelList = (p: box, blist: box[]) => {
  if (!p.boxChildList || !boxList.value) return
  p.boxChildList?.splice(p.boxChildList.indexOf(blist), 1)
  if (p.boxChildList.length < 2) {
    boxList.value?.splice(boxList.value.indexOf(p))
  }
}
interface box {
  type: number
  boxChildList?: box[][]
}
const addType1 = (i: number) => {
  if (!boxList.value) return
  boxList.value.splice(i + 1, 0, { type: 1 })
  console.log(boxList.value)
}
const addType2 = (i: number) => {
  if (!boxList.value) return
  boxList.value.splice(i + 1, 0, { type: 2, boxChildList: [[{ type: 3 }], [{ type: 3 }]] })
  console.log(boxList.value)
}
const addType22 = (i: number) => {
  if (!boxList.value) return
  if (boxList.value[i].boxChildList !== undefined) {
    boxList.value[i].boxChildList.push([{ type: 3 }])
  }
  console.log(boxList.value)
}
const close1 = (i: number) => {
  boxList.value?.splice(i, 1)
}
const close3 = (i: number) => {
  boxList.value?.splice(i, 1)
  emits('delList', boxList.value as box[])
}
</script>
<template>
  <div class="main" :style="{ 'min-width': isChild ? 'auto' : '100%' }">
    <template v-for="(item, index) in boxList" :key="index">
      <div class="type1" v-if="item.type === 1">
        <div class="content">
          <el-button type="primary" @click="addType1(index)">type 1</el-button>
          <el-button type="primary" @click="addType2(index)">type 2</el-button>
          <el-button type="warning" @click="close1(index)">close</el-button>
        </div>
        <div class="line"></div>
      </div>
      <div class="type2" v-if="item.type === 2" @click="console.log(item, boxList)">
        <!-- <div class="topAdd">
          <div class="topAddButton">
            <el-button type="primary" @click="addType22(index)">+</el-button>
          </div>
        </div> -->
        <div class="content">
          <div class="topAddButton">
            <el-button type="primary" @click="addType22(index)">+</el-button>
          </div>
          <template v-for="(item2, p) in item.boxChildList" :key="p">
            <div class="NodeWrapContainer">
              <div v-if="p === 0">
                <div class="top-left-cover"></div>
                <div class="bottom-left-cover"></div>
              </div>
              <div v-if="p === (item.boxChildList?.length as number) - 1">
                <div class="top-right-cover"></div>
                <div class="bottom-right-cover"></div>
              </div>
              <NodeWrap
                v-if="boxList && boxList[index].boxChildList"
                @delList="
                  () => {
                    if (boxList && boxList[index].boxChildList) {
                      onDelList(boxList[index], boxList[index].boxChildList[p])
                    }
                  }
                "
                :isChild="true"
                v-model="boxList[index].boxChildList[p] as box[]"
              ></NodeWrap>
            </div>
          </template>
        </div>
        <div class="line">
          <div class="aaddButton">
            <el-button type="primary" @click="addType1(index)">type 1</el-button>
            <el-button type="primary" @click="addType2(index)">type 2</el-button>
          </div>
        </div>
      </div>
      <div class="type3" v-if="item.type === 3">
        <div class="lineTop"></div>
        <div class="content">
          <el-button type="primary" @click="addType1(index)">type 1</el-button>
          <el-button type="primary" @click="addType2(index)">type 2</el-button>
          <el-button type="warning" @click="close3(index)">close</el-button>
        </div>
        <div class="line"></div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.main {
  background-color: white;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  min-width: 100%;
  .type1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:first-child {
      .content {
        &::before {
          content: none;
        }
      }
    }
    .content {
      &::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 0;
        height: 4px;
        border-style: solid;
        border-width: 8px 6px 4px;
        border-color: #cacaca transparent transparent;
        background: #f5f5f7;
      }
      position: relative;
      min-width: 200px;
      padding: 10px;
      margin: 0 20px;
      display: flex;
      justify-content: space-around;
      border: 1px solid black;
    }
    .line {
      width: 2px;
      height: 60px;
      background-color: rgb(164, 157, 157);
    }
    &:last-child {
      flex: 1;
      .line {
        flex: 1;
        min-height: 60px;
      }
    }
  }
  .type2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    .topAdd {
      align-self: stretch;
      position: relative;
      display: flex;
      justify-content: center;
      .topAddButton {
        z-index: 999;
      }
      .topAddLine {
        height: 2px;
        background-color: gray;
        position: absolute;
        left: 115px;
        right: 115px;
        top: 50%;
        z-index: 1;
      }
    }
    .content {
      .topAddButton {
        position: absolute;
        left: 50%;
        top: 0px;
        transform: translate(-50%, -50%);
        z-index: 999;
      }
      .NodeWrapContainer {
        display: flex;
        align-items: stretch;
        position: relative;
        .top-left-cover {
          position: absolute;
          width: 50%;
          height: 4px;
          background-color: white;
          left: 0;
          top: -2px;
        }
        .bottom-left-cover {
          position: absolute;
          width: 50%;
          height: 2px;
          background-color: white;
          left: 0;
          bottom: -2px;
        }
        .top-right-cover {
          position: absolute;
          width: 50%;
          height: 4px;
          background-color: white;
          right: 0;
          top: -2px;
        }
        .bottom-right-cover {
          position: absolute;
          width: 50%;
          height: 2px;
          background-color: white;
          right: 0;
          bottom: -2px;
        }
      }
      display: flex;
      position: relative;
      justify-content: center;
      align-items: stretch;
      border-top: 2px solid rgb(164, 157, 157);
      border-bottom: 2px solid rgb(164, 157, 157);
    }
    .line {
      width: 2px;
      height: 60px;
      background-color: rgb(164, 157, 157);
      position: relative;
      .aaddButton {
        display: flex;
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &:last-child {
      flex: 1;
      .line {
        flex: 1;
        min-height: 60px;
      }
    }
  }
  .type3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    .lineTop {
      height: 20px;
      background-color: rgb(164, 157, 157);
      width: 2px;
    }
    .content {
      min-width: 200px;
      padding: 10px;
      margin: 0 20px;
      display: flex;
      justify-content: space-around;
      border: 1px solid lightblue;
    }
    .line {
      width: 2px;
      height: 60px;
      background-color: rgb(164, 157, 157);
    }
    &:last-child {
      flex: 1;
      .line {
        flex: 1;
        min-height: 60px;
      }
    }
  }
}
</style>
