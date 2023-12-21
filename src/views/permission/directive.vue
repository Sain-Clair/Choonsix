<script lang="ts" setup>
import { ref } from "vue"
import { checkPermission } from "@/utils/permission" // checkPermission 권한 판별 함수
import SwitchRoles from "./components/SwitchRoles.vue"

/** key는 권한을 전환할 때마다 지시문을 다시 초기화하기 위해 사용됩니다. */
const key = ref(1)
const handleRolesChange = () => {
  key.value++
}
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <!-- v-permission 예시 -->
    <div :key="key" class="margin-top-30">
      <div>
        <el-tag v-permission="['admin']" type="success" size="large" effect="plain">
          여기에 v-permission="['admin']"을 사용하여 admin만이이 문장을 볼 수 있습니다.
        </el-tag>
      </div>
      <div>
        <el-tag v-permission="['editor']" type="success" size="large" effect="plain">
          여기에 v-permission="['editor']"을 사용하여 editor만이이 문장을 볼 수 있습니다.
        </el-tag>
      </div>
      <div class="margin-top-15">
        <el-tag v-permission="['admin', 'editor']" type="success" size="large" effect="plain">
          여기에 v-permission="['admin', 'editor']"을 사용하여 admin과 editor 모두이 문장을 볼 수 있습니다.
        </el-tag>
      </div>
    </div>
    <!-- checkPermission 예시 -->
    <div :key="`checkPermission${key}`" class="margin-top-30">
      <el-tag type="warning" size="large">
        예를 들어 Element Plus의 el-tab-pane 또는 el-table-column 및 기타 동적 렌더링 Dom의 경우 v-permission을
        사용하기에 적합하지 않습니다. 이러한 경우 v-if 및 checkPermission을 사용하여 구현할 수 있습니다.
      </el-tag>
      <el-tabs type="border-card" class="margin-top-15">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          여기에 <el-tag>v-if="checkPermission(['admin'])"</el-tag>을 사용하여 admin만이이 문장을 볼 수 있습니다.
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="editor">
          여기에 <el-tag>v-if="checkPermission(['editor'])"</el-tag>을 사용하여 editor만이이 문장을 볼 수 있습니다.
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="admin과 editor">
          여기에 <el-tag>v-if="checkPermission(['admin', 'editor'])"</el-tag>을 사용하여 admin 및 editor 모두이 문장을
          볼 수 있습니다.
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.margin-top-15 {
  margin-top: 15px;
}
.margin-top-30 {
  margin-top: 30px;
}
</style>
