<script lang="ts" setup>
import { h } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// Set Element Plus language to Korean
import koKr from "element-plus/es/locale/lang/ko"

const { initTheme } = useTheme()

/** Initialize the theme */
initTheme()

/** Author's Note */
ElNotification({
  title: "춘식이 이벤트",
  type: "success",
  message: h(
    "a",
    { style: "color: teal", target: "_blank", href: "https://ictedu.co.kr/index.php?main_page=home" },
    "귀여운 춘식이"
  ),
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <el-config-provider :locale="koKr">
    <router-view />
  </el-config-provider>
</template>
