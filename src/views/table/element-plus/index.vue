<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/table"
import { type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 현재 컴포넌트의 이름 지정
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 추가
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  username: "",
  password: ""
})
const formRules: FormRules = reactive({
  username: [{ required: true, trigger: "blur", message: "사용자 이름을 입력하세요" }],
  password: [{ required: true, trigger: "blur", message: "비밀번호를 입력하세요" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createTableDataApi(formData)
          .then(() => {
            ElMessage.success("추가되었습니다.")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateTableDataApi({
          id: currentUpdateId.value,
          username: formData.username
        })
          .then(() => {
            ElMessage.success("수정되었습니다.")
            getTableData()
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.error("폼 검증 실패", fields)
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.username = ""
  formData.password = ""
}
//#endregion

//#region 삭제
const handleDelete = (row: GetTableData) => {
  ElMessageBox.confirm(`사용자 삭제 중: ${row.username}, 삭제 확인?`, "알림", {
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success("삭제 성공")
      getTableData()
    })
  })
}
//#endregion

//#region 수정
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetTableData) => {
  currentUpdateId.value = row.id
  formData.username = row.username
  dialogVisible.value = true
}
//#endregion

//#region 조회
const tableData = ref<GetTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  username: "",
  phone: ""
})
const getTableData = () => {
  loading.value = true
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: searchData.username || undefined,
    phone: searchData.phone || undefined
  })
    .then((res: any) => {
      // 여기서 ResponseType은 실제 응답 타입에 따라서 정의되어야 합니다.
      paginationData.total = res.data.total
      tableData.value = res.data.list
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 페이지 파라미터 변경 감시 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="사용자 이름">
          <el-input v-model="searchData.username" placeholder="입력하세요" />
        </el-form-item>
        <el-form-item prop="phone" label="휴대폰 번호">
          <el-input v-model="searchData.phone" placeholder="입력하세요" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">검색</el-button>
          <el-button :icon="Refresh" @click="resetSearch">초기화</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">사용자 추가</el-button>
          <el-button type="danger" :icon="Delete">일괄 삭제</el-button>
        </div>
        <div>
          <el-tooltip content="다운로드">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="현재 페이지 새로고침">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="사용자 이름" align="center" />
          <el-table-column prop="roles" label="역할" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" effect="plain">admin</el-tag>
              <el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="휴대폰 번호" align="center" />
          <el-table-column prop="email" label="이메일" align="center" />
          <el-table-column prop="status" label="상태" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain">활성</el-tag>
              <el-tag v-else type="danger" effect="plain">비활성</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="생성일" align="center" />
          <el-table-column fixed="right" label="조작" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">수정</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">삭제</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 추가/수정 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '사용자 추가' : '사용자 수정'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="username" label="사용자 이름">
          <el-input v-model="formData.username" placeholder="입력하세요" />
        </el-form-item>
        <el-form-item prop="password" label="비밀번호" v-if="currentUpdateId === undefined">
          <el-input v-model="formData.password" placeholder="입력하세요" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">취소</el-button>
        <el-button type="primary" @click="handleCreate">확인</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
