export type Notification = {
  id: number
  title: string
  isChecked: boolean
}
export type NotifcationsType = {
  notificationPreference: Notification[]
  notificationType: Notification[]
}

export const INITIAL_STATE: NotifcationsType = {
  notificationPreference: [
    {
      id: 1,
      title: "Push Notification",
      isChecked: true,
    },
    {
      id: 2,
      title: "Email Notification",
      isChecked: true,
    },
  ],
  notificationType: [
    {
      id: 1,
      title: "New Ticket",
      isChecked: true,
    },
    {
      id: 2,
      title: "New Ticket Assignment",
      isChecked: true,
    },
    {
      id: 3,
      title: "Status Change",
      isChecked: true,
    },
    {
      id: 4,
      title: "Mentions",
      isChecked: true,
    },
  ],
}
