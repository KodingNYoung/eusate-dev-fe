import {
  Remark,
  SateAI,
  PriorityType,
  INITIAL_SATE_STATE,
} from "@/components/views/settings/Sate-ai/utils"
import {
  FC,
  useMemo,
  useState,
  ReactNode,
  useContext,
  createContext,
} from "react"
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

type SettingsContextType = {
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
  getFeedback: string | null
  bugChannels: Channel[]
  getRemarks: Remark
}

const SettingsContext = createContext<SettingsContextType | null>(null)

const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sateAi, setSateAi] = useState<SateAI>(INITIAL_SATE_STATE)
  const [notifications, setNotifications] =
    useState<NotifcationsType>(INITIAL_STATE)
  const [integrations, setIntegrations] =
    useState<IntegrationsType>(dummyAppChannels)

  const getRemarks = useMemo(() => sateAi.remarks, [sateAi.remarks])
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
        updateTicketChannels,
        updateBugChannels,
        notificationPreference,
        notificationType,
        updatePriority,
        updateFeedback,
        ticketChannels,
        getPriorities,
        updateRemarks,
        bugChannels,
        getFeedback,
        getRemarks,
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
