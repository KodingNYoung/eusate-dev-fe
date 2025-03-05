import AuthHeader from "@/components/molecules/AuthHeader"
import { fireEvent, getByText, render, screen } from "@testing-library/react"

const mockBack = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}))

describe("AuthHeader", () => {
  it("should display title and subtitle correctly", () => {
    render(
      <AuthHeader
        data-testid="title-subtitle-test"
        title="Title"
        subtitle="Subtitle"
      />
    )

    const header = screen.getByTestId("title-subtitle-test")
    const title = getByText(header, "Title")
    const subtitle = getByText(header, "Subtitle")

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })

  it("shows the back btn if hasBackBtn is passed", () => {
    render(
      <AuthHeader
        data-testid="back-button-show"
        hasBackBtn
        title="Testing back button"
        subtitle=""
      />
    )

    const header = screen.getByTestId("back-button-show")
    const button = screen.queryByText("Back")

    expect(button).toBeInTheDocument()
    expect(header).toContainElement(button)
  })

  it("hides the back btn if hasBackBtn is not passed", () => {
    render(
      <AuthHeader
        data-testid="back-button-hide"
        title="Testing back button"
        subtitle=""
      />
    )

    const header = screen.getByTestId("back-button-hide")
    const button = screen.queryByText("Back")

    expect(button).not.toBeInTheDocument()
    expect(header).not.toContainElement(button)
  })

  it("back button navigates backwards when clicked", () => {
    render(
      <AuthHeader
        data-testid="back-btn-action"
        hasBackBtn
        title=""
        subtitle=""
      />
    )

    const header = screen.getByTestId("back-btn-action")
    const btn = getByText(header, "Back")

    fireEvent.click(btn)
    expect(mockBack).toHaveBeenCalled()
  })
})
