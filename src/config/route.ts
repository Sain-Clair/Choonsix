/** 동적 라우트 설정 */
interface RouteSettings {
  /**
   * 동적 라우트 기능을 활성화하시겠습니까?
   * 1. 활성화하려면 백엔드에서 사용자 세부 정보 쿼리 인터페이스에서 현재 사용자가 동적 라우트를 판단하고 로드하는 데 필요한 필드를 반환해야 합니다. (이 프로젝트에서는 역할 roles 필드를 사용합니다.)
   * 2. 프로젝트가 다른 사용자에게 다른 페이지를 표시할 필요가 없다면 async: false로 설정해야 합니다.
   */
  async: boolean
  /** 동적 라우트 기능이 비활성화된 경우:
   * 1. 모든 라우트를 상주 라우트에 작성해야 합니다. (모든 로그인한 사용자가 액세스할 수 있는 페이지가 동일함을 의미)
   * 2. 시스템은 현재 로그인한 사용자에게 아무런 기능이 없는 기본 역할을 자동으로 할당합니다.
   */
  defaultRoles: Array<string>
  /**
   * 3단계 및 그 이상의 라우트 캐시 기능을 활성화하시겠습니까?
   * 1. 활성화하면 라우트 강등이 수행됩니다. (3단계 이상의 라우트를 2단계 라우트로 변환)
   * 2. 모든 것이 2단계 라우트로 변환되므로 2단계 이상의 라우트에 중첩된 하위 라우트는 작동하지 않을 것입니다.
   */
  thirdLevelRouteCache: boolean
}

const routeSettings: RouteSettings = {
  async: true,
  defaultRoles: ["DEFAULT_ROLE"],
  thirdLevelRouteCache: false
}

export default routeSettings
