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
  chatPayload: [],
}

export const MockFiles: (File | string)[] = [
  mockFileGenerator("particle.png", "image/png"),
  mockFileGenerator("particle.png", "image/png"),
]
