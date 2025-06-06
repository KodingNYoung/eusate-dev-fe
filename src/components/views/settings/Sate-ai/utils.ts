export type Remark = { opening_remark: string; closing_remark: string }
export type SateAI = {
  remarks: Remark
  prioty: unknown
  feedback: unknown
}

export enum SateAiTabsType {
  REMARKS = "remarks",
  PRIORITY = "priority",
  FEEDBACK = "feedback",
}
export const SATE_AI_QUERY_KEYS = {
  TAB: "tab",
} as const
export const SATE_AI_TABS: { key: SateAiTabsType; label: string }[] = [
  {
    key: SateAiTabsType.REMARKS,
    label: "Remarks",
  },
  {
    key: SateAiTabsType.PRIORITY,
    label: "Priority",
  },
  {
    key: SateAiTabsType.FEEDBACK,
    label: "Feedback",
  },
] as const
