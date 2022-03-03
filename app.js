const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromisses = () => Array(150).fill().map((_, i) =>
fetch(getPokemonUrl(i+1)).then(res => res.json()));

const generateHtml = (pokemons) =>
	(lisPokemons = pokemons.reduce((accumulator, {name, id, types}) => {
		const elementTypes = types.map((typeInfo) => typeInfo.type.name);
		accumulator += `<li class= "card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
            <h2 class = "card-title">${id}. ${name}</h2>
            <p class= "card-subtitle">${elementTypes.join(" | ").toUpperCase()}</p>
        </li>`;
		return accumulator;
	}, ""));
const insertPokemonsIntoPage = pokemons =>{
    const ul = document.querySelector('[data-js ="pokedex"]');
    ul.innerHTML = pokemons;
}

const pokemonPromisses = generatePokemonPromisses();
Promise.all(pokemonPromisses)
    .then(generateHtml)
	    .then(insertPokemonsIntoPage);