

### Diagram flow

#### Simple invocation 

Representative a flow of invocations without replacements priorities


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

