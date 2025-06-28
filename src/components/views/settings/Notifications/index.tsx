"use client"

import Typography from "@/components/atoms/Typography"
import { useSettings } from "@/providers/settingsProvider"
import Notification from "@/components/views/settings/_components/Notification"

const Notifications = () => {
  const {
    notificationType,
    notificationPreference,
    updateNotificationType,
    updateNotificationPreference,
  } = useSettings()

  const onNotificationPreferenceChange = (id: number) => {
    updateNotificationPreference(
      notificationPreference.map((pref) => {
        if (pref.id === id) pref.isChecked = !pref.isChecked
        return pref
      })
    )
  }
  const onNotificationTypeChange = (id: number) => {
    updateNotificationType(
      notificationType.map((type) => {
        if (type.id === id) type.isChecked = !type.isChecked
        return type
      })
    )
  }
  return (
    <section className="grid gap-6 w-full">
      <div className="flex flex-col gap-6 border-1 border-gray-100 rounded-x20 p-8 w-full">
        <Typography variant="regular-base" className="text-gray-500">
          Notification preference
        </Typography>
        <div className="flex flex-wrap items-center gap-20">
          {notificationPreference.map(({ id, isChecked, title }) => (
            <Notification
              key={id}
              title={title}
              isChecked={isChecked}
              action={() => onNotificationPreferenceChange(id)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 border-1 border-gray-100 rounded-x20 p-8 w-full">
        <Typography variant="regular-base" className="text-gray-500">
          Notification type
        </Typography>
        <div className="flex items-center gap-20">
          {notificationType.map(({ id, isChecked, title }) => (
            <Notification
              key={id}
              title={title}
              isChecked={isChecked}
              action={() => onNotificationTypeChange(id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Notifications
