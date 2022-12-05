import { HTTPTransport } from "./HTTPTransport"

const API_BASENAME = "https://jsonplaceholder.typicode.com"

describe("HTTPTransport", () => {
  jest.setTimeout(100000)
  const client = new HTTPTransport(API_BASENAME)

  it("should GET", async () => {
    expect.assertions(1)
    const res = await client.get("/posts/1")
    expect(res).toBeTruthy()
  })

  it.skip("should POST", async () => {
    expect.assertions(1)
    const res = await client.post("/posts", {
      body: {
        title: "baz",
        body: "ber",
        userId: 1,
      },
    })

    expect(res).toBeTruthy()
  })

  it("should PUT", async () => {
    expect.assertions(1)
    const res = await client.put("/posts/2", {
      body: {
        id: 22,
        userId: 41241,
        body: "foo",
        title: "bar",
      },
    })
    expect(res).toBeTruthy()
  })

  it("should DELETE", async () => {
    expect.assertions(1)
    const res = await client.delete("/posts/2")
    expect(res).toBeTruthy()
  })
})
