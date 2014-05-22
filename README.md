angular-websocket-service is a [WebSocket][] service for
[AngularJS][].  Use it to send and receive messages consisting of a
topic string (without spaces) followed by a space and a [JSON][]
payload.  For example:

    /state/put {"name": "Alice", "friends": ["Bob", "Charlie"]}

The user-facing API is just `emit` (to send outgoing messages) and
`register` (to add a callback for incoming messages).  See
`example.html` for a working example.

Similar packages
================

* [angular-websocket][] sends and receives opaque messages using a
  `send` method and events with a configurable prefix (MIT).  The
  event-generating code is not clear to me, so I'm not actually sure
  how the prefix bit works.
* [angular-websocket-provider][] sends and receives JSON messages
  using a `request` method and `websocket.<METHOD>` and
  `websocket.message` events.  `<METHOD>` is set using the payload's
  `method` value (GPLv2).
* [angular-reconnecting-websocket][] wraps websockets to automatically
  reconnect after accidental disconnections (MIT).

[WebSocket]: http://www.w3.org/TR/websockets/
[AngularJS]: https://angularjs.org/
[JSON]: http://json.org/
[angular-websocket]: https://github.com/gdi2290/angular-websocket
[angular-websocket-provider]: https://github.com/instabledesign/angular-websocket
[angular-reconnecting-websocket]: https://github.com/adieu/angular-reconnecting-websocket
