import { userComp } from '../components/userComponent.js'
import { UserStore } from '../model/userStore.js'
import someAPI from '../api/someAPI.js'
export class UserCtr {
  constructor({ id }) {
    this.id = id
    this.userData = null
  }
  async getUserData() {
    const data = await someAPI.v1.doSomething()
    this.updateData(data)
  }
  updateData({ name, age, gender, id }) {
    // api로 데이터 업데이트 가능~
    this.userData = new UserStore({
      name,
      age,
      gender,
      id,
    })
  }
  addComponent() {
    const dom = document.querySelector(`#${this.id}`)
    dom?.insertAdjacentHTML('afterend', userComp(this.userData))
  }
}
