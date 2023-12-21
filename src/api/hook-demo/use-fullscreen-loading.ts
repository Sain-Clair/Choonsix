/** 모의 API 응답 데이터 */
const SUCCESS_RESPONSE_DATA = {
  code: 0,
  data: {
    list: [] as number[]
  },
  message: "성공적으로 가져왔습니다."
}

/** 성공적인 API 요청 모의 */
export function getSuccessApi(list: number[]) {
  return new Promise<typeof SUCCESS_RESPONSE_DATA>((resolve) => {
    setTimeout(() => {
      resolve({ ...SUCCESS_RESPONSE_DATA, data: { list } })
    }, 1000)
  })
}

/** 실패하는 API 요청 모의 */
export function getErrorApi() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("오류가 발생했습니다."))
    }, 1000)
  })
}
