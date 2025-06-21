import {
  Remark,
  SateAI,
  PriorityType,
} from "@/components/views/settings/Sate-ai/utils"
import {
  dummyProfile,
  dummyOrganizationInfo,
} from "@/components/views/settings/dummy"
import { Organization, Profile } from "@/components/views/settings/utils"
import {
  FC,
  useMemo,
  useState,
  ReactNode,
  useContext,
  createContext,
} from "react"
import { Info } from "@/components/views/settings/Organization/Info/utils"
import { dummyMembers } from "@/components/views/settings/Organization/Members/MembersArea/utils/dummy"

type EditableInfoItems = Pick<Info, "avatar" | "name" | "size" | "industry">
type EditableProfileItems = Pick<Profile, "fullname" | "avatar">
type SettingsContextType = {
  updateProfile: (profileItem: EditableProfileItems) => void
  updateOrganizationInfo: (infoItems: EditableInfoItems) => void
  updatePriority: (priority: PriorityType[]) => void
  updateRemarks: (remark: Remark) => void
  updateFeedback: (feedback: string) => void
  getPriorities: PriorityType[]
  organization: Organization
  getFeedback: string | null
  getRemarks: Remark
  getInfo: Info
  profile: Profile
}

const SettingsContext = createContext<SettingsContextType | null>(null)

const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(dummyProfile)
  const [sateAi, setSateAi] = useState<SateAI>({
    remarks: { closing_remark: "", opening_remark: "" },
    priority: [],
    feedback: null,
  })
  const [organization, setOrganization] = useState<Organization>({
    info: dummyOrganizationInfo,
    members: dummyMembers,
  })

  const getRemarks = useMemo(() => sateAi.remarks, [sateAi.remarks])
  const getInfo = useMemo(() => organization.info, [organization.info])
  const getFeedback = useMemo(() => sateAi.feedback, [sateAi.feedback])
  const getPriorities = useMemo(() => sateAi.priority, [sateAi.priority])

  const updateFeedback = (feedback: string) =>
    setSateAi({ ...sateAi, feedback })
  const updateProfile = (profile_: EditableProfileItems) => {
    setProfile({ ...profile, ...profile_ })
  }
  const updateOrganizationInfo = (infoItems: EditableInfoItems) => {
    setOrganization(({ members, info }) => ({
      members,
      info: { ...info, ...infoItems },
    }))
  }
  const updateRemarks = (remarks: Remark) => {
    setSateAi({
      ...sateAi,
      remarks: { ...sateAi.remarks, ...remarks },
    })
  }
  const updatePriority = (prioties: PriorityType[]) => {
    setSateAi({
      ...sateAi,
      priority: [...prioties],
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        updateOrganizationInfo,
        updatePriority,
        updateFeedback,
        getPriorities,
        updateRemarks,
        updateProfile,
        organization,
        getFeedback,
        getRemarks,
        profile,
        getInfo,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context)
    throw new Error("useSettingsContext must be inside SettingsProvider")
  return context
}

export { SettingsProvider as default, SettingsContext, useSettings }
