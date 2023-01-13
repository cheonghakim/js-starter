export class Observer {
  constructor() {
    this.handlers = {};
  }

  register(eventName, handler, context) {
    const handleArray = this.handlers[eventName];
    if (!this.handlers[eventName]) handleArray = this.handlers[eventName] = [];
    handleArray.push({ handler: handler, context: context });
  }

  unregister(eventName, handler, context) {
    const handleArray = this.handlers[eventName];
    if (!handleArray) return;
    for (const i = 0, max = handleArray.length; i < max; i++) {
      const currentHandler = handleArray[i];
      if (handler === currentHandler['handler'] && context === currentHandler['context']) {
        handleArray.splice(i, 1);
        return;
      }
    }
  }

  // 상태 변경시 이벤트를 알려줄 함수
  notify(eventName, data) {
    const handleArray = this.handlers[eventName];
    if (!handleArray) return;
    for (const i = 0, max = handleArray.length; i < max; i++) {
      const currentHandler = handleArray[i];
      currentHandler['handler'].call(currentHandler['context'], data);
    }
  }
}
