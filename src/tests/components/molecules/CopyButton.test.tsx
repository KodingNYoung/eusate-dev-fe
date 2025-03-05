import CopyButton from "@/components/molecules/Buttons/CopyButton"
import { fireEvent, render, screen } from "@testing-library/react"

const writeText = vi.fn()

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
})

describe("CopyButton", () => {
  const textToCopy = "Test copy text"
  it("should show button content", () => {
    render(<CopyButton text={textToCopy}>Copy me</CopyButton>)

    const button = screen.getByText("Copy me")

    expect(button).toBeInTheDocument()
  })

  it("copies provided text when clicked on", async () => {
    const mockClipboard = vi.spyOn(navigator.clipboard, "writeText")
    render(
      <CopyButton data-testid="copy" text={textToCopy}>
        Copy text
      </CopyButton>
    )

    const button = screen.getByTestId("copy")

    fireEvent.click(button)
    expect(mockClipboard).toHaveBeenCalledWith(textToCopy)

    mockClipboard.mockRestore()
  })

  it("Should show tooltip with copied text on click", async () => {
    render(
      <CopyButton data-testid="show-tooltip" text={textToCopy}>
        Click me
      </CopyButton>
    )

    const button = screen.getByTestId("show-tooltip")
    fireEvent.click(button)

    const tooltip = screen.getByText("Copied")
    expect(tooltip).toBeInTheDocument()
  })
})
