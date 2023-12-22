export interface ListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin Vite 온라인",
    datetime: "1년 전",
    description:
      "무료 오픈 소스 중후한 관리 시스템의 기본 솔루션은 Vue3, TypeScript, Element Plus, Pinia 및 Vite를 기반으로 합니다."
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin 온라인",
    datetime: "2년 전",
    description: "중후한 관리 시스템의 기본 솔루션은 Vue3, TypeScript, Element Plus 및 Pinia를 기반으로 합니다."
  }
]

export const messageData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "추문의 세계에서",
    description: "다시 너를 볼 수 없다면, 좋은 아침, 낮, 밤을 기원합니다.",
    datetime: "1998-06-05"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "대화서곡",
    description: "이 사랑에 기한을 정한다면, 나는 만 천 년을 기원합니다.",
    datetime: "1995-02-04"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "토토로에서",
    description: "선의를 품으면 반드시 천사를 만날 수 있습니다.",
    datetime: "1988-04-16"
  }
]

export const todoData: ListItem[] = [
  {
    title: "작업 이름",
    description: "이 친구는 귀찮아서 아무것도 남기지 않았어요.",
    extra: "시작되지 않음",
    status: "info"
  },
  {
    title: "작업 이름",
    description: "이 친구는 귀찮아서 아무것도 남기지 않았어요.",
    extra: "진행 중",
    status: ""
  },
  {
    title: "작업 이름",
    description: "이 친구는 귀찮아서 아무것도 남기지 않았어요.",
    extra: "기한 초과",
    status: "danger"
  }
]
