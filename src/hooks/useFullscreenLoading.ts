import { type LoadingOptions, ElLoading } from "element-plus"

const defaultOptions = {
  lock: true,
  text: "로딩 중..."
}

interface LoadingInstance {
  close: () => void
}

interface UseFullscreenLoading {
  <T extends (...args: any[]) => ReturnType<T>>(
    fn: T,
    options?: LoadingOptions
  ): (...args: Parameters<T>) => Promise<ReturnType<T>>
}

/**
 * 함수 fn을 전달하면 해당 함수 실행 중에 "전체 화면" 로딩이 추가됩니다.
 * @param fn 실행할 함수
 * @param options LoadingOptions
 * @returns Promise를 반환하는 새로운 함수를 반환합니다.
 */
export const useFullscreenLoading: UseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: LoadingInstance
  return async (...args) => {
    try {
      loadingInstance = ElLoading.service({ ...defaultOptions, ...options })
      return await fn(...args)
    } finally {
      loadingInstance?.close()
    }
  }
}
