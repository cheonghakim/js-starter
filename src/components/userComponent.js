export const userComp = (userStore) => {
  const { name, age, gender, id } = userStore
  return `
  <div class="card col-2" id="${id}">
    <div class="card-body">
      <h5 class="card-title">이름: ${name}</h5>
      <p class="card-text"><div>나이: ${age}</div></p>
      <p class="card-text"><div>성별: ${gender}</div></p>
    </div>
  </div>
  `
}
