import { throttleAsync } from "./throttle-async"
import { setTimeout, setInterval } from 'timers/promises'

describe('throttleAsync', () => {
  it('demo flow 1', async () => {
    const a = jest.fn((...args: any[]) => { })

    const fn = throttleAsync(async (callName: string) => {
      a(callName)
      await setTimeout(150)
    });

    fn('A')
    await setTimeout(150)
    fn('B')
    await setTimeout(150)
    fn('C')

    await fn.waitFinish()

    expect(a.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "A",
        ],
        Array [
          "B",
        ],
        Array [
          "C",
        ],
      ]
    `)
  })

  it('demo flow 2', async () => {
    const a = jest.fn((...args: any[]) => { })

    const fn = throttleAsync(async (callName: string) => {
      a(callName)
      await setTimeout(150)
    });

    fn('A')
    await setTimeout(10)
    fn('B')
    await setTimeout(140)
    fn('C')
    await setTimeout(150)
    fn('D')

    await fn.waitFinish()

    expect(a.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "A",
        ],
        Array [
          "C",
        ],
        Array [
          "D",
        ],
      ]
    `)
  })

  it('should use submit message style', async () => {
    // Emulate a fetch function
    const fetch = jest.fn((o: { callName: string, messages: string[] }) => Promise.resolve({ ok: true }))
    let messages: string[] = [];

    const submit = throttleAsync(async (callName: string) => {
      await setTimeout(500);
      const nextMessages = [...messages];
      messages = [];
      fetch({ callName, messages: nextMessages });
    });

    //     submit.throttleAsync.subscribe((s) => console.log('%O', s));

    let n = 0;
    for await (const _ of setInterval(250)) {
      n += 1;

      messages.push(`message ${n}`);
      submit(`${n}`);

      if (n >= 9) {
        break;
      }
    }

    await submit.waitFinish();
  })
})
