import { IconNames } from "@/utils/iconNames"
import SupportCard from "../_components/SupportCard"

const SUPPORTS: {
  id: number
  icon: IconNames
  title: string
  description: string
  btnLabel: string
  action?: () => void
}[] = [
  {
    id: 1,
    icon: "icon-eusate",
    title: "Chat with us",
    btnLabel: "Reach out",
    description:
      "Reach out with a message and receive immediate assistance from our AI and customer support team.",
  },
  {
    id: 2,
    icon: "icon-sms",
    title: "Send us a mail",
    btnLabel: "Send a mail",
    description:
      "Feel free to reach out via email for any inquiries or assistance. We typically reply instantly.",
  },
  {
    id: 3,
    icon: "icon-message-question",
    title: "Read our FAQs",
    btnLabel: "Go to FAQs",
    description:
      "Dive into our FAQ s, where you can find answers to common inquiries and better understand our services.",
  },
]

const Support = () => {
  return (
    <section className="flex flex-wrap gap-5">
      {SUPPORTS.map(({ id, ...support }) => (
        <SupportCard key={id} {...support} />
      ))}
    </section>
  )
}

export default Support
