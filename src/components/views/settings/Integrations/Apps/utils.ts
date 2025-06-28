// TYPES
export type IntegrationChannels = "ticket_channel" | "bug_channels"
export type ChannelsKeys =
  | "whatsapp"
  | "telegram"
  | "discord"
  | "slack"
  | "googleSheets"
export type Channel = {
  id: number
  title: string
  isConnected: boolean
}
export type TicketChannel = {
  title: string
  channels: Channel[]
}
export type BugChannel = {
  title: string
  channels: Channel[]
}
export type IntegrationsType = {
  bugChannels: BugChannel
  ticketChannels: TicketChannel
}

// CONSTANTS
export const CHANNEL_TITLE_TO_KEY: Record<string, ChannelsKeys> = {
  "Slack": "slack",
  "Discord": "discord",
  "Whatsapp": "whatsapp",
  "Telegram": "telegram",
  "Google Sheets": "googleSheets",
}
export const dummyAppChannels: IntegrationsType = {
  ticketChannels: {
    title: "Ticket channels",
    channels: [
      {
        id: 1,
        title: "Whatsapp",
        isConnected: false,
      },
      {
        id: 2,
        title: "Telegram",
        isConnected: false,
      },
      {
        id: 3,
        title: "Discord",
        isConnected: false,
      },
    ],
  },
  bugChannels: {
    title: "Bug channels",
    channels: [
      {
        id: 1,
        title: "Slack",
        isConnected: false,
      },
      {
        id: 2,
        title: "Google Sheets",
        isConnected: false,
      },
      {
        id: 3,
        title: "Discord",
        isConnected: false,
      },
    ],
  },
}
