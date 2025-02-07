import { AiTones, ResourceSources } from "@/utils/enums"
import { PlaygroundSettings } from "@/utils/types"

// enums
export enum FeedbackType {
  LIKE = "like",
  DISLIKE = "dislike",
}

// constants
export const PREFERENCES_DEFAULT_VALUES: PlaygroundSettings = {
  source: ResourceSources.ALL,
  tone: AiTones.NORMAL,
  temperature: 0,
  topP: 1,
}
export const FEEDBACK_SUGGESTIONS = {
  [FeedbackType.LIKE]: [
    "Totally accurate",
    "Super easy to get",
    "Really informative",
    "Fun and creative",
    "Looks great",
    "Something different",
  ],
  [FeedbackType.DISLIKE]: [
    "Not quite right",
    "A bit tricky to navigate",
    "Could use more details",
    "Not very engaging",
    "Could look better",
    "Nothing special",
  ],
}
