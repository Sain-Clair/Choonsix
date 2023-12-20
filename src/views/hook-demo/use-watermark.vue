<script lang="ts" setup>
import { ref } from "vue"
import { useWatermark } from "@/hooks/useWatermark"

const localRef = ref<HTMLElement | null>(null)
const { setWatermark, clearWatermark } = useWatermark(localRef)
const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <h4>귀여운 춘식이</h4>
    <div ref="localRef" class="local" />
    <el-button-group>
      <el-button type="primary" @click="setWatermark('局部水印', { color: '#409eff' })"
        >워터마크에 나타난 춘식이</el-button
      >
      <el-button type="warning" @click="setWatermark('没有防御功能的局部水印', { color: '#e6a23c', defense: false })">
        워터마크 춘식이
      </el-button>
      <el-button type="danger" @click="clearWatermark">워터마크에 나타난 춘삼이</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" @click="setGlobalWatermark('全局水印', { color: '#409eff' })">낄낄</el-button>
      <el-button
        type="warning"
        @click="setGlobalWatermark('没有防御功能的全局水印', { color: '#e6a23c', defense: false })"
      >
        다이어트춘
      </el-button>
      <el-button type="danger" @click="clearGlobalWatermark">다이어트 춘</el-button>
    </el-button-group>
  </div>
</template>

<style lang="scss" scoped>
.local {
  height: 30vh;
  border: 2px dashed var(--el-color-primary);
  margin-bottom: 20px;
}

.el-button-group {
  margin-right: 12px;
}
</style>
