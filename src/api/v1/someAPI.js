import axios from 'axios'

export default class SomeAPI {
  static v1 = '/api/test-service/v1'
  static doSomething() {
    // 가짜 api
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve({
          name: 'Lisa',
          age: 18,
          gender: 'female',
          id: 34,
        })
      }, 250)
    })
  }
}
