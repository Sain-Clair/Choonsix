<script lang="ts" setup>
import { useTagsViewStore } from "@/store/modules/tags-view"
import { useSettingsStore } from "@/store/modules/settings"
import Footer from "./Footer/index.vue"

const tagsViewStore = useTagsViewStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <!-- "key는 route.path와 route.fullPath를 사용하는 것 간에 다른 효과가 있으며, 대부분의 경우 path가 더 일반적입니다." -->
      <router-view v-slot="{ Component, route }">
        <transition name="el-fade-in" mode="out-in">
          <keep-alive :include="tagsViewStore.cachedViews">
            <component :is="Component" :key="route.path" class="app-container-grow" />
          </keep-alive>
        </transition>
      </router-view>
      <!-- 페이지 하단 -->
      <Footer v-if="settingsStore.showFooter" />
    </div>
    <!-- 맨 위로 이동하는 버튼 -->
    <el-backtop />
    <!-- 맨 위로 이동하는 버튼 (고정 헤더일 때) -->
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.app-main {
  width: 100%;
  background-color: var(--v3-body-bg-color);
  display: flex;
}

.app-scrollbar {
  flex-grow: 1;
  overflow: auto;
  @extend %scrollbar;
  display: flex;
  flex-direction: column;

  .app-container-grow {
    flex-grow: 1;
  }
}
</style>
