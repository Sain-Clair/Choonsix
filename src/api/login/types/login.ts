export interface LoginRequestData {
  /** admin 또는 editor */
  username: "admin" | "editor"
  /** 비밀번호 */
  password: string
  /** 인증 코드 */
  code: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
