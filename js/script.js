document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.input__search');
    const pokemonImage = document.querySelector('.pokemon__image');
    const pokemonNumber = document.querySelector('.pokemon__number');
    const pokemonName = document.querySelector('.pokemon__name');
    const pokemonType = document.querySelector('.pokemon__type');
    const pokemonHeight = document.querySelector('.pokemon__height');
    const pokemonWeight = document.querySelector('.pokemon__weight');
    const prevButton = document.querySelector('.btn-prev');
    const nextButton = document.querySelector('.btn-next');
    const pokemonSound = document.getElementById('pokemon-sound');
    const backgroundMusic = document.getElementById('background-music');

    const btnSearch = document.querySelector('.btn-search');

    let currentPokemonId = 1;

    // dimimui volume da musica para 10%
    backgroundMusic.volume = 0.1; // Set volume to 10%

    const fetchPokemon = async (idOrName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
            
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            const pokemon = await response.json();

            console.log(pokemon)
            updatePokemonInfo(pokemon);
            /* */
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            if (idOrName.trim()) {
                
            }
        }
    };

    const updatePokemonInfo = (pokemon) => {
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonNumber.textContent = pokemon.id;

        pokemonName.textContent = `${pokemon.forms[0].name}`;
        
        console.log(pokemon.forms[0].name)
        
        
        pokemonType.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
        pokemonHeight.textContent = (pokemon.height / 10).toFixed(1); // Converter para metros
        pokemonWeight.textContent = (pokemon.weight / 10).toFixed(1); // Converter para kg
        playPokemonSound(pokemon.id);
    };

    const playPokemonSound = (id) => {
        const soundFile = `sounds/cries_pokemon_${id}_latest.ogg`;
        pokemonSound.src = soundFile;
        pokemonSound.play();
    };

    pokemonImage.addEventListener('click', () => {
        const soundFile = pokemonSound.src;
        if (soundFile) {
            pokemonSound.play();
        }
    });

    searchInput.addEventListener('search', () => {
        const idOrName = searchInput.value.toLowerCase().trim();
        if (idOrName > 1) {
            currentPokemonId -= idOrName;
            fetchPokemon(currentPokemonId);
            
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPokemonId > 1) {
            currentPokemonId -= 1;
            fetchPokemon(currentPokemonId);
        }
    });

    nextButton.addEventListener('click', () => {
        currentPokemonId += 1;
        fetchPokemon(currentPokemonId);
    });

    fetchPokemon(currentPokemonId);

    btnSearch.addEventListener('click', () => {

        const searchInput = document.querySelector('.input__search').value;
        fetchPokemon(searchInput);

        const sound = document.getElementById('background-music'); 
        sound.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${searchInput}.ogg`; 
    })
});



     