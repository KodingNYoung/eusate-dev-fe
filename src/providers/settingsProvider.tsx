import {
  dummyProfile,
  dummyOrganizationInfo,
} from "@/components/views/settings/dummy"
import { dummyMembers } from "@/components/views/settings/Organization/Members/MembersArea/utils/dummy"
import { Info, Organization, Profile } from "@/components/views/settings/utils"
import { createContext, FC, ReactNode, useContext, useState } from "react"

type EditableProfileItems = Pick<Profile, "fullname" | "src">
type EditableInfoItems = Pick<Info, "img_url" | "name" | "size" | "industry">
type SettingsContextType = {
  profile: Profile
  addProfile: (profile: Profile) => void
  organization: Organization
  updateProfileItem: (profileItem: EditableProfileItems) => void
  updateOrganizationInfo: (infoItems: EditableInfoItems) => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)
const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(dummyProfile)
  const [organization, setOrganization] = useState<Organization>({
    info: dummyOrganizationInfo,
    members: dummyMembers,
  })

  const updateProfileItem = (profileItems: EditableProfileItems) => {
    setProfile({ ...profile, ...profileItems })
  }
  const addProfile = (profile: Profile) => {
    setProfile(profile)
  }
  const updateOrganizationInfo = (infoItems: EditableInfoItems) => {
    setOrganization(({ members, info }) => ({
      members,
      info: { ...info, ...infoItems },
    }))
  }

  return (
    <SettingsContext.Provider
      value={{
        profile,
        addProfile,
        updateProfileItem,
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
