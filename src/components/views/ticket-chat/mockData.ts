import { TicketStatus, UserTemperament } from "../help-desk/utils"
import { Chat } from "./customer-chat"
import { Activity, Comment } from "./utils"
import { Chat as AIChat } from "./aichat"

export const MOCK_IMAGE_URL =
  "https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const mockFileGenerator = (filename: string, type: string) => {
  const minSize = 10 * 1024
  const maxSize = 50 * 1024
  const randomSize = Math.floor(Math.random() * (maxSize - minSize)) + minSize
  const content = new Uint8Array(randomSize)
  return new File([content], filename, { type })
}

export const MOCK_USER_CHAT: Chat = {
  customer: {
    id: "",
    avatarUrl: MOCK_IMAGE_URL,
    temperament: UserTemperament.CALM,
  },
  support: {
    id: "",
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Jane Smith",
  },
  chatPayload: [
    {
      person: "customer",
      createdAt: new Date("2025-04-24T09:15:00"),
      msg: "Hi, I need help with my order.",
    },
    {
      person: "support",
      createdAt: new Date("2025-04-24T09:16:30"),
      msg: "Of course! Can you share your order ID?",
    },
    {
      person: "customer",
      createdAt: new Date("2025-04-24T09:17:10"),
      msg: "#ORDER1234",
    },
    {
      person: "support",
      createdAt: new Date("2025-04-24T09:18:00"),
      msg: "Thanks! I’m checking that for you now.",
    },
  ],
}

export const MOCK_SATE_CHAT: AIChat = {
  sate: {
    id: "sate_001",
  },
  support: {
    id: "support_001",
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Jane Smith",
  },
  chatPayload: [
    {
      person: "support",
      createdAt: new Date("2025-04-24T09:15:00"),
      msg: "Hey Sate, can you tell me the order status for #ORDER5678?",
    },
    {
      person: "sate",
      createdAt: new Date("2025-04-24T09:15:30"),
      msg: "The order #ORDER5678 is currently being processed and will ship in 2 days.",
    },
    {
      person: "support",
      createdAt: new Date("2025-04-24T09:16:00"),
      msg: "Awesome. What’s the estimated delivery date?",
    },
    {
      person: "sate",
      createdAt: new Date("2025-04-24T09:16:30"),
      msg: "The estimated delivery date is April 28, 2025.",
      showComposer: true,
      files: Array.from({ length: 3 }).map(
        () => new File(["fake image data"], "photo.png", { type: "image/png" })
      ),
    },
    {
      person: "support",
      createdAt: new Date("2025-04-24T09:17:00"),
      msg: "Does the customer have any pending balance?",
    },
    {
      person: "sate",
      createdAt: new Date("2025-04-24T09:17:30"),
      msg: "No, the customer's balance is fully paid.",
    },
  ],
}

export const MockComments: Comment[] = [
  {
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Calum Willson",
    createdAt: new Date(),
    comment:
      "Hi team, I appreciate your help with this interventions. Looking forward to your response. Thanks!",
  },
  {
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Calum Willson",
    createdAt: new Date(),
    comment:
      "Hi team, I appreciate your help with this interventions. Looking forward to your response. Thanks!",
  },
  {
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Calum Willson",
    createdAt: new Date(),
    comment:
      "Hi team, I appreciate your help with this interventions. Looking forward to your response. Thanks!",
  },
]

export const MockActivity: Activity[] = [
  {
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Calum Willson",
    activityType: "status",
    createdAt: new Date(),
    status: TicketStatus.CLOSED,
  },
  {
    avatarUrl:
      "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
    name: "Calum Willson",
    activityType: "comment",
    createdAt: new Date(),
    comment:
      "Hi team, I appreciate your help with this interventions. Looking forward to your response. Thanks!",
  },
  {
    avatarUrl: "",
    name: "Calum Willson",
    activityType: "status",
    createdAt: new Date(),
    status: TicketStatus.RELEASED_AND_OPEN,
  },
  {
    avatarUrl: "",
    name: "Calum Willson",
    activityType: "comment",
    createdAt: new Date(),
    comment:
      "Hi team, I appreciate your help with this interventions. Looking forward to your response. Thanks!",
  },
]

export const MockFiles: (File | string)[] = [
  mockFileGenerator("particle.png", "image/png"),
  mockFileGenerator("particle.png", "image/png"),
]
