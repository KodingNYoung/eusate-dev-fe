// TYPES
export type Remark = { opening_remark: string; closing_remark: string }
export type PriorityType = {
  id: string
  area: string
  level: PriorityLevelType
}
export type PriorityLevelType = "critical" | "low" | "medium" | "high"
export type SateAI = {
  remarks: Remark
  priority: PriorityType[]
  feedback: string | null
}

// ENUMS
export enum SateAiTabsType {
  REMARKS = "remarks",
  PRIORITY = "priority",
  FEEDBACK = "feedback",
}
export enum PriorityLevels {
  CRITICAL = "critical",
  MEDIUM = "medium",
  HIGH = "high",
  LOW = "low",
}

// CONSTANTS
export const SATE_AI_QUERY_KEYS = {
  TAB: "tab",
} as const
export const PRIORITY_COLOR_MAP = {
  [PriorityLevels.MEDIUM]: "info",
  [PriorityLevels.LOW]: "neutral",
  [PriorityLevels.HIGH]: "warning",
  [PriorityLevels.CRITICAL]: "error",
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
export const PRIORITY_LEVELS: { key: PriorityLevelType; label: string }[] = [
  {
    key: "critical",
    label: "Critical",
  },
  {
    key: "high",
    label: "High",
  },
  {
    key: "medium",
    label: "Medium",
  },
  {
    key: "low",
    label: "Low",
  },
] as const
