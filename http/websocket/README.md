## websocket

 > Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说.跟HTTP协议基本没有关系，只是为了兼容现有浏览器的握手规范而已，也就是说它是HTTP协议上的一种补充。Web Socket 连接不是基于 HTTP 传输的，它是一种 HTML 5 为 Web 定制的全双工通讯协议，没有“请求 - 响应”的概念，浏览器与服务器完全平等，连接一旦建立就一直开放，双方可随时向对方发送任意数据，没有推拉之分。  

ws最大的优势：在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息，并且允许跨域通信。  

目前主流的浏览器都支持WebSocket，并且有第三方的API：Guillermo Rauch创建了一个Socket.IO，遵循Engine.IO协议[Engine.IO protocol](https://github.com/socketio/engine.io-protocol)。  

* 发送包类型：

    - 0: open  transport is opened(传输打开)
    - 1: close
    - 2: ping  Send by client. Server should answer with a pong packet containing the same data
    - 3: pong  Sent by the server to respond to ping packets.
    - 4: message  actual message, client and server should call their callbacks with the data.(callback - 42, not - 41)
    - 5: upgrade  polling or websoket
    - 6: noop  等待

* **example:**

    client connects through new transport

    client sends 2probe

    server receives and sends 3probe

    client receives and sends 5
    
    server flushes and closes old transport and switches to new.