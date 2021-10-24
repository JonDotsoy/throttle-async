# throttle-async

```ts
import { throttleAsync } from '@jondotsoy/throttle-async'
import { setTimeout } from 'timers/promises'

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
// LOGS:
// invoke: 0.655ms InvokeFn 1
// invoke: 2.004s InvokeFn 7
// invoke: 4.009s InvokeFn 10
```


#### Common invocations 

Successive invocations, expected stages.

This stage the second invoke (B) wait the first invoke (A).

```
              invoke() invoke()                                invoke()
              |        |                                       |
Timeline: ----A--------B---------------------------------------C-------
              |        |                                       |
Pending:  ---(A)------(B------------B)------------------------(C)------
              |                     |                          |
WorkFlow: ----A====================-B==================--------C=======
```

#### Invoke action and replace pending

```
              invoke() invoke()   invoke()                     invoke()
              |        |          |                            |
Timeline: ----A--------B----------C----------------------------D-------
              |        |          |                            |
Pending:  ---(A)------(B------B)-(C-----C)--------------------(D)------
              |                         |                      |
WorkFlow: ----A========================-C==================----D=======
```

