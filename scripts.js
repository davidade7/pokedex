const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const imgDiv = document.getElementById("img")
const app = document.getElementById("pokemon-search-app")
const pokeInfo = document.getElementById("pokemon-info")
// const pokeStats = document.getElementById("pokemon-stats")
const background = document.getElementById("background");

// pokemon info
const pkName = document.getElementById("pokemon-name")
const pkId = document.getElementById("pokemon-id")
const pkWeight = document.getElementById("weight")
const pkHeight = document.getElementById("height")
const pkTypes = document.getElementById("types")
const pkHP = document.getElementById("hp")
const pkAttack = document.getElementById("attack")
const pkDefense = document.getElementById("defense")
const pkSpeAttack = document.getElementById("special-attack")
const pkSpeDefense = document.getElementById("special-defense")
const pkSpeed = document.getElementById("speed")

// progess bars
const progPkHP = document.getElementById("hp-progress")
const progPkAtt = document.getElementById("att-progress")
const progPkDef = document.getElementById("def-progress")
const progPkSpeAtt = document.getElementById("spe-att-progress")
const progPkSpeDef = document.getElementById("spe-def-progress")
const progPkSpeed = document.getElementById("speed-progress")

const pkemonAPIUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"

const checkInput = async () => {
  const inputValue = searchInput.value
  
  if (!isNaN(inputValue)) {
    getPokemon(inputValue)
  } else {
    let searchName = inputValue.replace(/\s/, '-').toLowerCase()
    getPokemon(searchName)
  }
} 

const getPokemon = async name => {
  try {
    pkTypes.innerText = ""
    background.className = ""
    pokeInfo.classList.remove("hidden")

    const response = await fetch(pkemonAPIUrl + name)
    const pokemon = await response.json()
    //console.log(pokemon)
  
    pkName.innerText = pokemon.name.toUpperCase()
    pkId.innerText = pokemon.id
    pkWeight.innerText = pokemon.weight / 10
    pkHeight.innerText = pokemon.height / 10
    imgDiv.innerHTML = `
      <img id="sprite" src="${pokemon.sprites["front_default"]}"></img>
    `
    pkHP.innerText = pokemon.stats[0]["base_stat"]
    progPkHP.value = pokemon.stats[0]["base_stat"]
    pkAttack.innerText = pokemon.stats[1]["base_stat"]
    progPkAtt.value = pokemon.stats[1]["base_stat"]
    pkDefense.innerText = pokemon.stats[2]["base_stat"]
    progPkDef.value = pokemon.stats[2]["base_stat"]
    pkSpeAttack.innerText = pokemon.stats[3]["base_stat"]
    progPkSpeAtt.value = pokemon.stats[3]["base_stat"]
    pkSpeDefense.innerText = pokemon.stats[4]["base_stat"]
    progPkSpeDef.value = pokemon.stats[4]["base_stat"]
    pkSpeed.innerText = pokemon.stats[5]["base_stat"]
    progPkSpeed.value = pokemon.stats[5]["base_stat"]
  
    for (let i = 0; i < pokemon.types.length; i++) {
      pkTypes.innerHTML += `
        <span class='type ${pokemon.types[i]["type"]["name"]}'>${pokemon.types[i]["type"]["name"].toUpperCase()}</span>
      `
    }

    background.classList.add(`bg-${pokemon.types[0]["type"]["name"]}`)
  } catch {
    alert('Pokémon not found')
  }
}

searchBtn.addEventListener("click", checkInput);
searchInput.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    checkInput()
  }
})