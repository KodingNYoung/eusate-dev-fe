import { IconNames } from "@/utils/iconNames"
import SupportCard from "../_components/SupportCard"

const RESOURCES: {
  id: number
  icon: IconNames
  title: string
  description: string
  btnLabel: string
  action?: () => void
}[] = [
  {
    id: 1,
    icon: "icon-document",
    title: "Our Blog",
    btnLabel: "Read our blog",
    description:
      "Explore our blog for insights, tips, and updates from our team on features and our products!",
  },
  {
    id: 2,
    icon: "icon-article-text",
    title: "Read our documentation",
    btnLabel: "Check documentation",
    description:
      "Explore our documentation for detailed guidance and support on using our features effectively.",
  },
  {
    id: 3,
    icon: "icon-cloud-connection",
    title: "Get our API",
    btnLabel: "Get our API",
    description:
      "Detailed guidance, examples, and support to seamlessly integrate our services into your applications.",
  },
]

const Resources = () => {
  return (
    <section className="flex flex-wrap gap-5">
      {RESOURCES.map(({ id, ...resource }) => (
        <SupportCard key={id} {...resource} />
      ))}
    </section>
  )
}

export default Resources
