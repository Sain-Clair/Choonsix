export interface CreateTableRequestData {
  사용자명: string
  비밀번호: string
}

export interface UpdateTableRequestData {
  id: string
  사용자명: string
  비밀번호?: string
}

export interface GetTableRequestData {
  /** 현재 페이지 번호 */
  currentPage: number
  /** 조회할 항목 수 */
  size: number
  /** 조회 매개변수: 사용자명 */
  사용자명?: string
  /** 조회 매개변수: 전화번호 */
  전화번호?: string
}

export interface GetTableData {
  생성시간: string
  이메일: string
  id: string
  전화번호: string
  역할: string
  상태: boolean
  사용자명: string
}

export type GetTableResponseData = ApiResponseData<{
  목록: GetTableData[]
  총계: number
}>
