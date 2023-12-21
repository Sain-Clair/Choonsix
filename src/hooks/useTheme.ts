import { ref, watchEffect } from "vue"
import { getActiveThemeName, setActiveThemeName } from "@/utils/cache/local-storage"

const DEFAULT_THEME_NAME = "normal"
type DefaultThemeName = typeof DEFAULT_THEME_NAME

/** 등록된 테마 이름, 그 중 DefaultThemeName은 필수입니다. */
export type ThemeName = DefaultThemeName | "dark" | "dark-blue"

interface ThemeList {
  title: string
  name: ThemeName
}

/** 테마 목록 */
const themeList: ThemeList[] = [
  {
    title: "기본",
    name: DEFAULT_THEME_NAME
  },
  {
    title: "어두운",
    name: "dark"
  },
  {
    title: "진한 파랑",
    name: "dark-blue"
  }
]

/** 적용 중인 테마 이름 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

/** 테마 설정 */
const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

/** HTML 루트 요소에 클래스 부여 */
const setHtmlRootClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

/** 초기화 */
const initTheme = () => {
  // watchEffect로 부작용 수집
  watchEffect(() => {
    const value = activeThemeName.value
    setHtmlRootClassName(value)
    setActiveThemeName(value)
  })
}

/** 테마 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
