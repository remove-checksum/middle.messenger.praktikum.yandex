import { screen } from "@testing-library/dom"
import { Block } from "./Block"
import { renderBlock } from "../tests/renderUtils"
import { sleep } from "../helpers/sleep"

describe("Block", () => {
  const CDMSpy = jest.fn()
  const CDUSpy = jest.fn()
  const BlockTestId = "MockBlock"
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  const noopHandler = (e: Event) => {}
  const getBlockTestIdElement = () => screen.getByTestId(BlockTestId)

  type MockBlockProps = {
    text: string
    onClick: (e: Event) => void
    newText: string
    shouldUpdate: boolean
  }

  class MockBlock extends Block {
    blockName = "MockBlock"

    constructor({
      text,
      onClick,
      newText,
      shouldUpdate = true,
    }: MockBlockProps) {
      super({
        text,
        shouldUpdate,
        events: {
          click: (e: Event) => {
            onClick(e)
            this.setProps({ text: newText })
          },
        },
      })
    }

    componentDidMount(): void {
      CDMSpy()
    }

    componentDidUpdate(): boolean {
      CDUSpy()
      return this.props.shouldUpdate
    }

    render() {
      return /* html */ `
        <div data-testid="${BlockTestId}">{{ text }}</div>
      `
    }
  }

  afterEach(() => {
    CDMSpy.mockClear()
    CDUSpy.mockClear()
  })

  it("should pass props to template", async () => {
    const testString = "TestString"

    await renderBlock({
      TargetBlock: MockBlock,
      props: { text: testString },
    })

    expect(screen.getByText(testString)).toBeInTheDocument()
  })

  it("should create event handlers", async () => {
    const onClickSpy = jest.fn()

    await renderBlock({
      TargetBlock: MockBlock,
      props: {
        text: "Mock",
        onClick: onClickSpy,
      },
    })

    screen.getByText("Mock").click()
    expect(onClickSpy).toBeCalled()
  })

  it("should be able to rerender on props change", async () => {
    const onClickSpy = jest.fn()

    const initialText = "Mock"
    const changedText = "Mock (Changed)"

    await renderBlock({
      TargetBlock: MockBlock,
      props: {
        text: initialText,
        newText: changedText,
        onClick: onClickSpy,
      },
    })

    expect(getBlockTestIdElement().textContent).toStrictEqual(initialText)

    getBlockTestIdElement().click()

    await sleep()

    expect(getBlockTestIdElement().textContent).toStrictEqual(changedText)
  })

  it("should dispatch componentDidMount after mounting", async () => {
    await renderBlock({
      TargetBlock: MockBlock,
      props: { text: "Placeholder text" },
    })

    expect(CDMSpy).toBeCalledTimes(2)
  })

  it("should dispatch componentDidUpdate after props change", async () => {
    await renderBlock({
      TargetBlock: MockBlock,
      props: {
        text: "Placeholder text",
        onClick: noopHandler,
        newText: "Placeholder text (Changed)",
      },
    })

    getBlockTestIdElement().click()

    await sleep()

    expect(CDUSpy).toBeCalledTimes(1)
  })

  it("should be able to skip update with CDU", async () => {
    const initialText = "Mock"
    const changedText = "Mock (Changed)"

    await renderBlock({
      TargetBlock: MockBlock,
      props: {
        text: initialText,
        onClick: noopHandler,
        newText: changedText,
        shouldUpdate: false,
      },
    })

    expect(getBlockTestIdElement().textContent).toStrictEqual(initialText)

    getBlockTestIdElement().click()

    await sleep()

    expect(getBlockTestIdElement().textContent).toStrictEqual(initialText)
  })
})
