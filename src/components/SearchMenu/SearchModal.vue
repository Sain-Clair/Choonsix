<script lang="ts" setup>
import { computed, ref, shallowRef } from "vue"
import { type RouteRecordName, type RouteRecordRaw, useRouter } from "vue-router"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import SearchResult from "./SearchResult.vue"
import SearchFooter from "./SearchFooter.vue"
import { ElMessage, ElScrollbar } from "element-plus"
import { cloneDeep, debounce } from "lodash-es"
import { DeviceEnum } from "@/constants/app-key"
import { isExternal } from "@/utils/validate"

interface Props {
  /** 모달의 표시 여부를 제어하는 모델 값입니다. */
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  "update:modelValue": [boolean]
}>()

const appStore = useAppStore()
const router = useRouter()

const inputRef = ref<HTMLInputElement | null>(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const searchResultRef = ref<InstanceType<typeof SearchResult> | null>(null)

const keyword = ref<string>("")
const resultList = shallowRef<RouteRecordRaw[]>([])
const activeRouteName = ref<RouteRecordName | undefined>(undefined)
/** 위 아래 키를 눌렀는지 여부 (mouseenter 이벤트와의 충돌을 해결하기 위함) */
const isPressUpOrDown = ref<boolean>(false)

/** 검색 다이얼로그 너비를 제어합니다. */
const modalWidth = computed(() => (appStore.device === DeviceEnum.Mobile ? "80vw" : "40vw"))
/** 검색 다이얼로그의 표시 여부를 제어합니다. */
const modalVisible = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit("update:modelValue", value)
  }
})
/** 트리형 메뉴 데이터 */
const menusData = computed(() => cloneDeep(usePermissionStore().routes))

/** 검색 (디바운스) */
const handleSearch = debounce(() => {
  const flatMenusData = flatTree(menusData.value)
  resultList.value = flatMenusData.filter((menu) =>
    keyword.value ? menu.meta?.title?.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim()) : false
  )
  // 검색 결과 중 첫 번째 아이템을 기본으로 선택합니다.
  const length = resultList.value?.length
  activeRouteName.value = length > 0 ? resultList.value[0].name : undefined
}, 500)

/** 트리형 메뉴를 1차원 배열로 변환하여 메뉴 검색에 사용합니다. */
const flatTree = (arr: RouteRecordRaw[], result: RouteRecordRaw[] = []) => {
  arr.forEach((item) => {
    result.push(item)
    item.children && flatTree(item.children, result)
  })
  return result
}

/** 검색 다이얼로그를 닫습니다. */
const handleClose = () => {
  modalVisible.value = false
  // 사용자가 데이터 재설정을 볼 수 없도록 지연 처리
  setTimeout(() => {
    keyword.value = ""
    resultList.value = []
  }, 200)
}

/** 색인 위치에 따라 스크롤합니다. */
const scrollTo = (index: number) => {
  if (!searchResultRef.value) return
  const scrollTop = searchResultRef.value.getScrollTop(index)
  // el-scrollbar 스크롤 바를 수동으로 제어하여 맨 위로 스크롤합니다.
  scrollbarRef.value?.setScrollTop(scrollTop)
}

/** 키보드 위로 이동 */
const handleUp = () => {
  isPressUpOrDown.value = true
  const { length } = resultList.value
  if (length === 0) return
  // 해당 이름이 메뉴에서 처음으로 나타나는 위치 가져오기
  const index = resultList.value.findIndex((item) => item.name === activeRouteName.value)
  // 이미 맨 위에 있는 경우
  if (index === 0) {
    const bottomName = resultList.value[length - 1].name
    // 맨 위와 맨 아래의 bottomName이 같고 길이가 1보다 큰 경우, 한 번 더 이동 (맨 처음과 끝이 같아서 발생하는 키보드 위로 이동이 작동하지 않는 문제 해결)
    if (activeRouteName.value === bottomName && length > 1) {
      activeRouteName.value = resultList.value[length - 2].name
      scrollTo(length - 2)
    } else {
      // 맨 아래로 이동
      activeRouteName.value = bottomName
      scrollTo(length - 1)
    }
  } else {
    activeRouteName.value = resultList.value[index - 1].name
    scrollTo(index - 1)
  }
}

/** 키보드 아래로 이동 */
const handleDown = () => {
  isPressUpOrDown.value = true
  const { length } = resultList.value
  if (length === 0) return
  // 해당 이름이 메뉴에서 가장 마지막에 나타나는 위치 (연속된 두 개의 동일한 이름으로 인한 키보드 아래로 이동이 작동하지 않는 문제 해결)
  const index = resultList.value.map((item) => item.name).lastIndexOf(activeRouteName.value)
  // 이미 맨 아래에 있는 경우
  if (index === length - 1) {
    const topName = resultList.value[0].name
    // 맨 아래와 맨 위의 topName이 같고 길이가 1보다 큰 경우, 한 번 더 이동 (맨 처음과 끝이 같아서 발생하는 키보드 아래로 이동이 작동하지 않는 문제 해결)
    if (activeRouteName.value === topName && length > 1) {
      activeRouteName.value = resultList.value[1].name
      scrollTo(1)
    } else {
      // 맨 위로 이동
      activeRouteName.value = topName
      scrollTo(0)
    }
  } else {
    activeRouteName.value = resultList.value[index + 1].name
    scrollTo(index + 1)
  }
}

/** 키보드 엔터 키 */
const handleEnter = () => {
  const { length } = resultList.value
  if (length === 0) return
  const name = activeRouteName.value
  const path = resultList.value.find((item) => item.name === name)?.path
  if (path && isExternal(path)) {
    window.open(path, "_blank", "noopener, noreferrer")
    return
  }
  if (!name) {
    ElMessage.warning("이 메뉴로 검색하여 해당하는 라우트에 고유한 이름을 설정하세요.")
    return
  }
  try {
    router.push({ name })
  } catch {
    ElMessage.error("이 메뉴에 필수적인 동적 매개변수가 있어 검색을 통해 접근할 수 없습니다.")
    return
  }
  handleClose()
}

/** 키보드 위로 또는 아래로 키 해제 */
const handleReleaseUpOrDown = () => {
  isPressUpOrDown.value = false
}
</script>

<template>
  <el-dialog
    v-model="modalVisible"
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
    @keydown.up="handleUp"
    @keydown.down="handleDown"
    @keydown.enter="handleEnter"
    @keyup.up.down="handleReleaseUpOrDown"
    :before-close="handleClose"
    :width="modalWidth"
    top="5vh"
    class="search-modal__private"
    append-to-body
  >
    <el-input ref="inputRef" v-model="keyword" @input="handleSearch" placeholder="메뉴 검색" size="large" clearable>
      <template #prefix>
        <SvgIcon name="search" />
      </template>
    </el-input>
    <el-empty v-if="resultList.length === 0" description="검색 결과가 없습니다." :image-size="100" />
    <template v-else>
      <p>검색 결과</p>
      <el-scrollbar ref="scrollbarRef" max-height="40vh" always>
        <SearchResult
          ref="searchResultRef"
          v-model="activeRouteName"
          :list="resultList"
          :isPressUpOrDown="isPressUpOrDown"
          @click="handleEnter"
        />
      </el-scrollbar>
    </template>
    <template #footer>
      <SearchFooter :total="resultList.length" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.search-modal__private {
  .svg-icon {
    font-size: 18px;
  }

  .el-dialog__header {
    display: none;
  }

  .el-dialog__footer {
    border-top: 1px solid var(--el-border-color);
    padding: var(--el-dialog-padding-primary);
  }
}
</style>
