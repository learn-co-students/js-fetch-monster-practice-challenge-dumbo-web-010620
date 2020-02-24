// document.querySelector("#monster-container").querySelector("div")
// <div>​
//  <h2>​Uranus​</h2>
// ​  <h4>​Age: 3972.645796857134​</h4>​
//  <p>​…​</p>​
// </div>​

// <form id="monster-form">
//   <input id="name" placeholder="name...">
//   <input id="age" placeholder="age...">
//   <input id="description" placeholder="description...">
//   <button>Create</button>
// </form>

// api = GET http://localhost:3000/monsters
let monsterArray = []

const monsterForm = document.createElement("form")
const monsterContainer = document.querySelector("#monster-container")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")
const createMonster = document.querySelector("#create-monster")
let min = 0
let limit = 50

forwardButton.addEventListener("click", (e) => {
  limit += 50
  min += 50
  renderMonsterDiv(monsterArray)
})
backButton.addEventListener("click", (e) => {
  limit -= 50
  min -= 50
  renderMonsterDiv(monsterArray)
})
monsterForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const newMonsterObj = {
    name: e.target.name.value,
    age: e.target.age.value,
    description: e.target.description.value
  }

  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newMonsterObj)
  })
  .then(response => response.json())
  .then(responseMonsterObj => {
    monsterArray.push(responseMonsterObj)
    renderMonsterDivItem(responseMonsterObj)
  })
})

const filterMonsters = (monsterArray) => {
  monsterContainer.innerHTML = ``
  filteredMonsters = monsterArray.filter(monsterObj => (monsterObj.id <= limit) && (monsterObj.id >= min));
  return filteredMonsters
}
const renderMonsterDivItem = (monsterObj) => {
  const monsterDiv = document.createElement("div")
  monsterDiv.id = `${monsterObj.id}`
  monsterDiv.innerHTML = `
  <h2>​${monsterObj.name}</h2>
  <h4>​Age: ${monsterObj.age}</h4>​
  <p>​${monsterObj.description}</p>​
  `
  monsterContainer.append(monsterDiv)
}
const renderMonsterDiv = (monsterArray) => {
  filterMonsters(monsterArray).forEach(monsterObj => renderMonsterDivItem(monsterObj))
}
const createForm = () => {
  monsterForm.id = "new-monster-form"
  monsterForm.innerHTML = `
    <form id="monster-form">
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description...">
      <button type="submit">Create</button>
    </form>
  `
  createMonster.append(monsterForm)
}

fetch("http://localhost:3000/monsters")
  .then( (response) => response.json() )
  .then( responseMonsterArray =>{
    monsterArray = responseMonsterArray
    renderMonsterDiv(monsterArray)
    createForm()
   } )
