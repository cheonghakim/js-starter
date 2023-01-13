export class UserStore {
  constructor({ name, age, gender, id }) {
    this._name = name
    this._age = age
    this._gender = gender
    this._id = id
  }
  get name() {
    return this._name
  }
  get age() {
    return this._age
  }
  get gender() {
    return this._gender
  }
  get id() {
    return this._id
  }

  set name(newName) {
    this._name = newName
  }
  set age(newAge) {
    this._age = newAge
  }
  set gender(newGender) {
    this._gender = newGender
  }
  set id(newId) {
    this._id = newId
  }
}
