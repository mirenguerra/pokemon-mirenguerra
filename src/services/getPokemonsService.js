const getPokemons = (url) => {
    return fetch(url).then(response => response.json());
}
export default getPokemons;