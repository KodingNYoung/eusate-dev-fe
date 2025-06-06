import {
  dummyProfile,
  dummyOrganizationInfo,
} from "@/components/views/settings/dummy"
import { Organization, Profile } from "@/components/views/settings/utils"
import { createContext, FC, ReactNode, useContext, useState } from "react"
import { Info } from "@/components/views/settings/Organization/Info/utils"
import { Remark, SateAI } from "@/components/views/settings/Sate-ai/utils"
import { dummyMembers } from "@/components/views/settings/Organization/Members/MembersArea/utils/dummy"

type EditableProfileItems = Pick<Profile, "fullname" | "avatar">
type EditableInfoItems = Pick<Info, "avatar" | "name" | "size" | "industry">
type SettingsContextType = {
  updateProfile: (profileItem: EditableProfileItems) => void
  updateOrganizationInfo: (infoItems: EditableInfoItems) => void
  updateRemarks: (remark: Remark) => void
  getInfo: () => Info
  organization: Organization
  getProfile: () => Profile
  getRemarks: () => Remark
  profile: Profile
}
const SettingsContext = createContext<SettingsContextType | null>(null)

const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(dummyProfile)
  const [sateAi, setSateAi] = useState<SateAI>({} as SateAI)
  const [organization, setOrganization] = useState<Organization>({
    info: dummyOrganizationInfo,
    members: dummyMembers,
  })

  const getProfile = () => profile
  const getRemarks = () => sateAi.remarks
  const getInfo = () => organization.info

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

  return (
    <SettingsContext.Provider
      value={{
        profile,
        getProfile,
        getRemarks,
        getInfo,
        updateRemarks,
        updateProfile,
        organization,
        updateOrganizationInfo,
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
