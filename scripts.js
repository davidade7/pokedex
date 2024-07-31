const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const imgDiv = document.getElementById("img")
const app = document.getElementById("pokemon-search-app")
const pokeInfo = document.getElementById("pokemon-info")
const pokeEvo = document.getElementById("pokemon-evolutions")
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

// url to pokeapi
const pokeapi = "https://pokeapi.co/api/v2/pokemon/"
const pokeapiSpecies = "https://pokeapi.co/api/v2/pokemon-species/"


// Function to check input
const checkInput = async () => {
  const inputValue = searchInput.value
  
  if (!isNaN(inputValue)) {
    getPokemon(inputValue)
  } else {
    let searchName = inputValue.replace(/\s/, '-').toLowerCase()
    getPokemon(searchName)
  }
} 

// Function to get pokemon
const getPokemon = async name => {
  try {
    // Clear previous data
    pkTypes.innerText = ""
    background.className = ""
    pokeInfo.classList.remove("hidden")
    pokeEvo.innerHTML = ""

    // Fetch data
    const response = await fetch(pokeapi + name)
    const pokemon = await response.json()
    const response2 = await fetch(pokeapiSpecies + name)
    const pokemonSpecies = await response2.json()
  
    // Display data
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
  
    // Display types
    for (let i = 0; i < pokemon.types.length; i++) {
      pkTypes.innerHTML += `
        <span class='type ${pokemon.types[i]["type"]["name"]}'>${pokemon.types[i]["type"]["name"].toUpperCase()}</span>
      `
    }

    // Change background color
    background.classList.add(`bg-${pokemon.types[0]["type"]["name"]}`)

    // Evolution chain
    let evolution = []
    const evoChainUrl = pokemonSpecies.evolution_chain.url
    const response3 = await fetch(evoChainUrl)
    const evoData = await response3.json()
    let evoChainData = evoData.chain
    
    do {
      evolution.push({"name": evoChainData.species.name})
      evoChainData = evoChainData['evolves_to'][0]
    } while (!!evoChainData && evoChainData.hasOwnProperty('evolves_to'))  
  

    // Find evolution data
    for (let i = 0; i<evolution.length; i++) {
      const response4 = await fetch(pokeapi + evolution[i].name)
      const evoData = await response4.json()
      evolution[i].id = evoData.id
      evolution[i].sprite = evoData.sprites["front_default"]
      evolution[i].types = evoData.types
    }

    console.log(evolution)
    // Display evolution chain
    for (let i = 0; i < evolution.length; i++) {
      pokeEvo.innerHTML += `
        <div class="evolution">
          <div>
            <img src="${evolution[i].sprite}" alt="${evolution[i].name}" />
          </div>
          <div>
            <p>${evolution[i].name.toUpperCase()} <span>${evolution[i].id}</span></p>
            <p>
              ${evolution[i].types.map(type => `
                <span class='type ${type.type.name}'>${type.type.name.toUpperCase()}</span>
              `).join("")}
            </p>
          </div>
          
          
        </div>
      `
    }

  } catch (error) {
    console.error(error)
    alert('Pokémon not found')
  }
}

// Event listeners
searchBtn.addEventListener("click", checkInput);
searchInput.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    checkInput()
  }
})