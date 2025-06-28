import {
  Remark,
  SateAI,
  PriorityType,
  INITIAL_SATE_STATE,
} from "@/components/views/settings/Sate-ai/utils"
import {
  DUMMY_ORGANIZATION,
  dummyProfile,
} from "@/components/views/settings/dummy"
import {
  FC,
  useMemo,
  useState,
  ReactNode,
  useContext,
  createContext,
} from "react"
import { Organisation, Profile } from "@/components/views/settings/utils"
import { Info } from "@/components/views/settings/Organisation/OrganisationInfo/utils"
import {
  Channel,
  dummyAppChannels,
  IntegrationsType,
} from "@/components/views/settings/Integrations/Apps/utils"
import {
  INITIAL_STATE,
  NotifcationsType,
  Notification,
} from "@/components/views/settings/Notifications/utils"

type EditableInfoItems = Pick<Info, "avatar" | "name" | "size" | "industry">
type EditableProfileItems = Pick<Profile, "fullname" | "avatar">
type SettingsContextType = {
  updateProfile: (profileItem: EditableProfileItems) => void
  updateOrganisationInfo: (infoItems: EditableInfoItems) => void
  updateTicketChannels: (channels: Channel[]) => void
  updatePriority: (priority: PriorityType[]) => void
  updateBugChannels: (channels: Channel[]) => void
  updateFeedback: (feedback: string) => void
  updateNotificationPreference: (notificationPreference: Notification[]) => void
  updateNotificationType: (notificationType: Notification[]) => void
  notificationPreference: Notification[]
  notificationType: Notification[]
  updateRemarks: (remark: Remark) => void
  ticketChannels: Channel[]
  getPriorities: PriorityType[]
  organisation: Organisation
  getFeedback: string | null
  bugChannels: Channel[]
  getRemarks: Remark
  profile: Profile
  getInfo: Info
}

const SettingsContext = createContext<SettingsContextType | null>(null)

const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>(dummyProfile)
  const [sateAi, setSateAi] = useState<SateAI>(INITIAL_SATE_STATE)
  const [organisation, setOrganization] =
    useState<Organisation>(DUMMY_ORGANIZATION)
  const [notifications, setNotifications] =
    useState<NotifcationsType>(INITIAL_STATE)
  const [integrations, setIntegrations] =
    useState<IntegrationsType>(dummyAppChannels)

  const getRemarks = useMemo(() => sateAi.remarks, [sateAi.remarks])
  const getInfo = useMemo(() => organisation.info, [organisation.info])
  const getFeedback = useMemo(() => sateAi.feedback, [sateAi.feedback])
  const getPriorities = useMemo(() => sateAi.priority, [sateAi.priority])
  const notificationPreference = useMemo(
    () => notifications.notificationPreference,
    [notifications.notificationPreference]
  )
  const notificationType = useMemo(
    () => notifications.notificationType,
    [notifications.notificationType]
  )
  const ticketChannels = useMemo(
    () => integrations.ticketChannels.channels,
    [integrations.ticketChannels]
  )
  const bugChannels = useMemo(
    () => integrations.bugChannels.channels,
    [integrations.bugChannels]
  )

  const updateNotificationPreference = (updatedPreference: Notification[]) => {
    setNotifications((notifications) => ({
      ...notifications,
      notificationPreference: [...updatedPreference],
    }))
  }
  const updateNotificationType = (updatedType: Notification[]) => {
    setNotifications((notifications) => ({
      ...notifications,
      notificationType: [...updatedType] as Notification[],
    }))
  }
  const updateTicketChannels = (updatedChannels: Channel[]) => {
    setIntegrations((integrations) => ({
      ...integrations,
      ticketChannels: {
        ...integrations.ticketChannels,
        channels: [...updatedChannels],
      },
    }))
  }
  const updateBugChannels = (updatedChannels: Channel[]) => {
    setIntegrations((integrations) => ({
      ...integrations,
      bugChannels: {
        ...integrations.bugChannels,
        channels: [...updatedChannels],
      },
    }))
  }
  const updateFeedback = (feedback: string) =>
    setSateAi({ ...sateAi, feedback })
  const updateProfile = (profile_: EditableProfileItems) =>
    setProfile({ ...profile, ...profile_ })
  const updateOrganisationInfo = (infoItems: EditableInfoItems) =>
    setOrganization(({ members, info }) => ({
      members,
      info: { ...info, ...infoItems },
    }))
  const updateRemarks = (remarks: Remark) =>
    setSateAi({
      ...sateAi,
      remarks: { ...sateAi.remarks, ...remarks },
    })
  const updatePriority = (prioties: PriorityType[]) =>
    setSateAi({
      ...sateAi,
      priority: [...prioties],
    })

  return (
    <SettingsContext.Provider
      value={{
        updateNotificationPreference,
        updateNotificationType,
        updateOrganisationInfo,
        updateTicketChannels,
        updateBugChannels,
        notificationPreference,
        notificationType,
        updatePriority,
        updateFeedback,
        ticketChannels,
        getPriorities,
        updateRemarks,
        updateProfile,
        organisation,
        bugChannels,
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
