/** 모의 API 응답 데이터 */
const SELECT_RESPONSE_DATA = {
  code: 0,
  data: [
    {
      label: "사과",
      value: 1
    },
    {
      label: "바나나",
      value: 2
    },
    {
      label: "오렌지",
      value: 3,
      disabled: true
    }
  ],
  message: "셀렉트 데이터 가져오기 성공"
}

/** 모의 API */
export function getSelectDataApi() {
  return new Promise<typeof SELECT_RESPONSE_DATA>((resolve, reject) => {
    // 모의 API 응답 시간 2초
    setTimeout(() => {
      // 모의 API 호출 성공
      if (Math.random() < 0.8) {
        resolve(SELECT_RESPONSE_DATA)
      } else {
        // 모의 API 호출 오류
        reject(new Error("API 오류 발생"))
      }
    }, 2000)
  })
}
