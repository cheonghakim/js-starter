import bootstrap from './plugins/bootstrap.js'
import babel from './plugins/bebel.js'

import { UserCtr } from './controller/userController.js'
;(async function () {
  try {
    const ctr = new UserCtr({
      id: 'main',
    })
    await ctr.getUserData()
    ctr.addComponent()
  } catch (error) {
    console.trace(error)
  }
})()
