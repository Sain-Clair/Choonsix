<script lang="ts" setup>
import { ref } from "vue"
import SearchModal from "./SearchModal.vue"

/** 모달의 표시 여부를 제어합니다. */
const modalVisible = ref<boolean>(false)

/** 모달을 엽니다. */
const handleOpen = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <el-tooltip effect="dark" content="검색" placement="bottom">
      <SvgIcon name="search" @click="handleOpen" />
    </el-tooltip>
    <SearchModal v-model="modalVisible" />
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;

  &:focus {
    outline: none;
  }
}
</style>
