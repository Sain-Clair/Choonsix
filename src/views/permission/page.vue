<script lang="ts" setup>
import { useRouter } from "vue-router"
import SwitchRoles from "./components/SwitchRoles.vue"

const router = useRouter()
const handleRolesChange = () => {
  router.push({ path: "/403" })
}
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <el-tag type="warning" size="large"
      >현재 페이지는 관리자(admin) 권한만 볼 수 있으며, 권한을 변경하면 해당 페이지에 액세스할 수 없습니다.</el-tag
    >
  </div>
</template>

<style lang="scss" scoped>
.el-tag {
  margin-top: 15px;
}
</style>
