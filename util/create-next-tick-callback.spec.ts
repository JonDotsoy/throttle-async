import { createNextTickCallback } from "./create-next-tick-callback";
import { setTimeout } from 'timers/promises'


describe('createNextTickCallback', () => {

  it('Should one call in the next step', async () => {
    const log = jest.fn((...args: any) => { });

    const nextTick = createNextTickCallback();

    log('Step 1')

    nextTick(() => log('Tick 1'));
    nextTick(() => log('Tick 2'));

    log('Step 2');

    nextTick(() => log('Tick 3'));
    nextTick(() => log('Tick 4'));
    nextTick(() => log('Tick 5'));

    await setTimeout(2);

    log('Step 3');

    nextTick(() => log('Tick 6'));
    nextTick(() => log('Tick 7'));

    log('Step 4');

    nextTick(() => log('Tick 8'));

    await setTimeout(2);

    log('Step 5');

    expect(log.mock.calls).toEqual([
      ["Step 1"],
      ["Step 2"],
      ["Tick 5"],
      ["Step 3"],
      ["Step 4"],
      ['Tick 8'],
      ['Step 5'],
    ]);
  })

})
