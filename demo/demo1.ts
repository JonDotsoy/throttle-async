import { setTimeout } from "timers/promises";
import { throttleAsync } from "../throttle-async";

const main = async () => {
  console.time('invoke');

  const invokeFn = throttleAsync(async (n: string) => {
    console.timeLog('invoke', `InvokeFn ${n}`)
    await setTimeout(2_000);
  }, 1_000);

  invokeFn('1')
  invokeFn('2')
  invokeFn('4')
  await setTimeout(1_000);
  invokeFn('5')
  invokeFn('6')
  invokeFn('7')
  await setTimeout(1_000);
  invokeFn('8')
  invokeFn('9')
  await setTimeout(1_000);
  invokeFn('10')

  await invokeFn.waitFinish()
}

main();
