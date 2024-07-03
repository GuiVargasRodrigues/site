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

    // Diminuir volume da música de fundo para 5%
    backgroundMusic.volume = 0.05;

    const fetchPokemon = async (idOrName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            const pokemon = await response.json();
            updatePokemonInfo(pokemon);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    const updatePokemonInfo = (pokemon) => {
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonNumber.textContent = pokemon.id;
        pokemonName.textContent = `${pokemon.forms[0].name}`;
        pokemonType.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
        pokemonHeight.textContent = (pokemon.height / 10).toFixed(1); // Converter para metros
        pokemonWeight.textContent = (pokemon.weight / 10).toFixed(1); // Converter para kg

        playPokemonSound(pokemon.id);
    };

    const playPokemonSound = (id) => {
        // Parar qualquer som do Pokémon que esteja tocando
        if (!pokemonSound.paused) {
            pokemonSound.pause();
            pokemonSound.currentTime = 0;
        }
        // Pausar a música de fundo
        backgroundMusic.pause();

        const soundFile = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
        pokemonSound.src = soundFile;
        pokemonSound.volume = 1.0; // Aumentar volume do som do Pokémon para 100%
        pokemonSound.play();

        // Retomar a música de fundo após o término do som do Pokémon
        pokemonSound.onended = () => {
            backgroundMusic.play();
        };
    };

    searchInput.addEventListener('search', () => {
        const idOrName = searchInput.value.toLowerCase().trim();
        fetchPokemon(idOrName);
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
        const searchInputValue = searchInput.value.toLowerCase().trim();
        fetchPokemon(searchInputValue);
    });
});
