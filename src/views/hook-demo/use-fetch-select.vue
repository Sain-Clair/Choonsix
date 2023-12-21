<script lang="ts" setup>
import { useFetchSelect } from "@/hooks/useFetchSelect"
import { getSelectDataApi } from "@/api/hook-demo/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <h4>귀여운 춘식이</h4>
    <h5>셀렉트 춘식스</h5>
    <el-select :loading="loading" v-model="value" filterable>
      <el-option v-for="(item, index) in options" v-bind="item" :key="index" placeholder="선택하세요" />
    </el-select>
    <h5>셀렉트 V2 예시 (데이터 양이 많은 경우에 사용할 수 있는 컴포넌트)</h5>
    <el-select-v2 :loading="loading" v-model="value" :options="options" filterable placeholder="선택하세요" />
  </div>
</template>
