const pokemonResult = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const section = document.getElementById('main_section')

function catchPokemon() {
    fetch(pokemonResult, {method: 'GET'})
        .then(res => res.json())
        .then(allPokemon => allPokemon.results.forEach(el => {
            let container = document.getElementById("grid");
            section.appendChild(container)
            let cell = document.createElement("div");
            cell.innerHTML = el.name;
            cell.className = 'cell';
            container.appendChild(cell);
            cell.addEventListener('click', function () {
                fetch(`https://pokeapi.co/api/v2/pokemon/${cell.innerHTML}`, {method: 'GET'})
                    .then(res => res.json())
                    .then(pokemonStats => {
                            const popUp = document.createElement('div')
                            popUp.className = 'pop_up'
                            const imageSrc = pokemonStats.sprites.front_default;
                            const pokeHeight = pokemonStats.height;
                            const pokeWeight = pokemonStats.weight;
                            const imageEl = document.createElement('img');
                            imageEl.src = imageSrc;
                            popUp.append(imageEl, `Height: ${pokeHeight} Weight: ${pokeWeight}`)
                            section.appendChild(popUp)
                            if (popUp) {
                                container.style.visibility = 'hidden'
                            }
                            const button = document.createElement('button');
                            button.innerHTML = 'close'
                            button.style.marginTop = '20px'
                            popUp.appendChild(button)
                            button.addEventListener('click', function () {
                                section.removeChild(popUp)
                                container.style.visibility = 'visible'
                            })
                        }
                    )
            })
        }))
        .catch((err) => {
          alert(err)
        })
}


catchPokemon()