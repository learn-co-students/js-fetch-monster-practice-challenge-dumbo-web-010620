document.addEventListener("DOMContentLoaded", () => {

    const findMonsterContainer = document.querySelector("#monster-container")
    const findCreateMonster = document.querySelector("#create-monster")
    const findForwardButton = document.querySelector("#forward")
    const findBackButton = document.querySelector("#back")
    let page = 1
    let limit = 50
    
    function getMonsters() {
        return fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(result => renderAll(result))
    }


    function renderAll(monstersArray){
        monstersArray.forEach(monster => {
            const newDiv = document.createElement("div")
            newDiv.innerHTML = `
                <h2>${monster.name}</h2>
                <h4>${monster.age}</h4>
                <p>${monster.description}</p>
            `
            findMonsterContainer.append(newDiv)
        })
    }

    const createForm = document.createElement("form")
    createForm.id = "monster-form"
    createForm.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>
    `
    findCreateMonster.append(createForm)


    // broken event listeners
    findForwardButton.addEventListener("click", event => {
        page += 1
        getMonsters()
    })

    findBackButton.addEventListener("click", event => {
        page -= 1
        getMonsters()
    })

    // run fetch
    getMonsters()
})