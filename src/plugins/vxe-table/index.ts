import { type App } from "vue"
// https://vxetable.cn/#/table/start/install
import VXETable from "vxe-table"
// https://github.com/x-extends/vxe-table-plugin-element
import VXETablePluginElement from "vxe-table-plugin-element"

VXETable.use(VXETablePluginElement)

/** 전역 기본 설정 */
VXETable.setup({
  /** 전역 크기 */
  size: "medium",
  /** 전역 zIndex 시작 값. 만약 프로젝트의 z-index 스타일 값이 큰 경우 더 큰 값으로 설정하여 가려지지 않도록 함 */
  zIndex: 9999,
  /** 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据 */
  version: 0,
  /** 全局 loading 提示内容，如果为 null 则不显示文本 */
  loadingText: null,
  table: {
    showHeader: true,
    showOverflow: "tooltip",
    showHeaderOverflow: "tooltip",
    autoResize: true,
    // stripe: false,
    border: "inner",
    // round: false,
    emptyText: "暂无数据",
    rowConfig: {
      isHover: true,
      isCurrent: true
    },
    columnConfig: {
      resizable: false
    },
    align: "center",
    headerAlign: "center",
    /** 行数据的唯一主键字段名 */
    rowId: "_VXE_ID"
  },
  pager: {
    // size: "medium",
    /** 配套的样式 */
    perfect: false,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    layouts: ["Total", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "Sizes", "FullJump"]
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    lockView: true,
    mask: true,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true,
    transfer: true,
    draggable: false
  }
})

export function loadVxeTable(app: App) {
  /** Vxe Table 组件完整引入 */
  app.use(VXETable)
}
