import AppCard from "../_components/AppCard"
import Typography from "@/components/atoms/Typography"
import SlackIcon from "@/assets/images/slack-icon.svg"
import { useSettings } from "@/providers/settingsProvider"
import DiscordIcon from "@/assets/images/discord-icon.svg"
import TelegramIcon from "@/assets/images/telegram-icon.svg"
import WhatsappIcon from "@/assets/images/whatsapp-icon.svg"
import { CHANNEL_TITLE_TO_KEY, ChannelsKeys } from "./utils"
import GoogleSheetsIcon from "@/assets/images/google-spreadsheet-icon.svg"

const IMAGE_MAP: { [k in ChannelsKeys]: string } = {
  googleSheets: GoogleSheetsIcon,
  whatsapp: WhatsappIcon,
  telegram: TelegramIcon,
  discord: DiscordIcon,
  slack: SlackIcon,
}
const Apps = () => {
  const {
    ticketChannels,
    bugChannels,
    updateTicketChannels,
    updateBugChannels,
  } = useSettings()

  const ticketChannelAction = (id: number) => {
    updateTicketChannels(
      ticketChannels.map((channel) => {
        if (channel.id === id) channel.isConnected = !channel.isConnected
        return channel
      })
    )
  }
  const bugChannelAction = (id: number) => {
    updateBugChannels(
      bugChannels.map((channel) => {
        if (channel.id === id) channel.isConnected = !channel.isConnected
        return channel
      })
    )
  }
  return (
    <section className="space-y-16">
      <div className="grid gap-4">
        <Typography variant="semibold-2xl" className="text-gray-400">
          Ticket channels
        </Typography>
        <div className="flex flex-wrap gap-5">
          {ticketChannels.map(({ title, isConnected, id }) => (
            <AppCard
              id={id}
              key={id}
              title={title}
              isConnected={isConnected}
              action={() => ticketChannelAction(id)}
              icon={IMAGE_MAP[CHANNEL_TITLE_TO_KEY[title]]}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <Typography variant="semibold-2xl" className="text-gray-400">
          Bug channels
        </Typography>
        <div className="flex flex-wrap gap-5">
          {bugChannels.map(({ title, isConnected, id }) => (
            <AppCard
              key={id}
              id={id}
              title={title}
              isConnected={isConnected}
              action={() => bugChannelAction(id)}
              icon={IMAGE_MAP[CHANNEL_TITLE_TO_KEY[title]]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Apps
