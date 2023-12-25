export interface CreateTableRequestData {
  username: string
  password: string
}

export interface UpdateTableRequestData {
  id: string
  username: string
  password?: string
}

export interface GetTableRequestData {
  /** 현재 페이지 번호 */
  currentPage: number
  /** 조회할 항목 수 */
  size: number
  /** 검색 매개변수: 사용자 이름 */
  username?: string
  /** 검색 매개변수: 휴대전화 번호 */
  phone?: string
}

export interface GetTableData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
