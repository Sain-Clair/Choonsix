<script lang="ts" setup>
import { watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { resetConfigLayout } from "@/utils"
import SelectLayoutMode from "./SelectLayoutMode.vue"
import { Refresh } from "@element-plus/icons-vue"

const settingsStore = useSettingsStore()

/** storeToRefs를 사용하여 추출된 속성을 반응형으로 유지합니다. */
const {
  layoutMode,
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

/** 스위치 설정 항목 정의 */
const switchSettings = {
  "태그 뷰 표시": showTagsView,
  "로고 표시": showLogo,
  "고정 헤더": fixedHeader,
  "푸터 표시": showFooter,
  "알림 표시": showNotify,
  "테마 전환 버튼 표시": showThemeSwitch,
  "전체 화면 버튼 표시": showScreenfull,
  "검색 버튼 표시": showSearchMenu,
  "태그 뷰 캐시 여부": cacheTagsView,
  "시스템 워터마크 활성화": showWatermark,
  "회색 모드 표시": showGreyMode,
  "색약 모드 표시": showColorWeakness
}

/** 왼쪽 모드가 아닌 경우 Header는 항상 고정된 레이아웃입니다. */
watchEffect(() => {
  layoutMode.value !== "left" && (fixedHeader.value = true)
})
</script>

<template>
  <div class="setting-container">
    <h4>레이아웃 구성</h4>
    <SelectLayoutMode />
    <el-divider />
    <h4>기능 구성</h4>
    <div class="setting-item" v-for="(settingValue, settingName, index) in switchSettings" :key="index">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" :disabled="layoutMode !== 'left' && settingName === '고정 헤더'" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetConfigLayout">리셋</el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.setting-container {
  padding: 20px;

  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .setting-name {
      @extend %ellipsis;
    }
  }

  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
