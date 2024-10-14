import { it, expect, describe, vi } from "vitest"
import { fireEvent, getByRole, render, screen } from "@testing-library/react"
import Button from "@/components/molecules/Button"
import "@testing-library/jest-dom/vitest"

describe("Button", () => {
  it("renders the button with children", () => {
    const text = "Click me"
    render(<Button data-testid="default-test">{text}</Button>)

    const button = screen.getByTestId("default-test")
    const typography = screen.getByText(text)

    expect(typography).toBeInTheDocument()
    expect(button).toContainElement(typography)
    expect(button).toHaveClass("primary-btn")
  })

  it("applies the correct class based on the variant prop", () => {
    render(
      <Button variant="error" data-testid="variant-test">
        Primary button
      </Button>
    )

    const button = screen.getByTestId("variant-test")

    expect(button).toHaveClass("error-btn")
  })

  it("renders start and end content when provided", () => {
    render(
      <Button
        data-testid="start-end-content-test"
        startContent={<span>Start</span>}
        endContent={<span>End</span>}
      >
        Button with start and content content
      </Button>
    )

    const startContent = screen.getByText("Start")
    const endContent = screen.getByText("End")
    const button = screen.getByTestId("start-end-content-test")

    expect(startContent).toBeInTheDocument()
    expect(endContent).toBeInTheDocument()
    expect(button).toContainElement(startContent)
    expect(button).toContainElement(endContent)
  })

  it("shows spinner and is disabled when loading", () => {
    render(
      <Button data-testid="loading-test" loading>
        Loading button
      </Button>
    )

    const loader = screen.getByRole("loader")
    const button = screen.getByTestId("loading-test")

    expect(loader).toBeInTheDocument()
    expect(button).toContainElement(loader)
    expect(button).toBeDisabled()
  })

  it("is disabled when disabled prop is passed", () => {
    render(
      <Button data-testid="disabled-test" disabled>
        Disabled button
      </Button>
    )

    const button = screen.getByTestId("disabled-test")

    expect(button).toBeDisabled()
  })

  it("calls onClick handler when clicked", () => {
    const onClick = vi.fn()
    render(
      <Button data-testid="click-test" onClick={onClick}>
        Clickable button
      </Button>
    )

    const button = screen.getByTestId("click-test")

    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("renders spinner instead of start content when loading", () => {
    render(
      <Button
        data-testid="loading-start-content-test"
        loading
        startContent={<span>Start</span>}
      >
        Loading button
      </Button>
    )

    const button = screen.getByTestId("loading-start-content-test")
    const loader = getByRole(button, "loader")

    expect(loader).toBeInTheDocument()
    expect(button).toContainElement(loader)
    expect(button).toBeDisabled()
  })
})
