<script lang="ts" setup>
import { ref } from "vue"

defineOptions({
  name: "메뉴2"
})

const text = ref("")
</script>

<template>
  <div class="app-container">
    <el-card header="이중 라우트 캐시 - 메뉴2">
      <el-input v-model="text" />
    </el-card>
  </div>
</template>
