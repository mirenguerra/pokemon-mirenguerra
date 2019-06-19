const evolutionURL = "https://pokeapi.co/api/v2/evolution-chain/";

const getEvolution = id => {
  return fetch(`${evolutionURL}${id}`).then(res => res.json());
};
export default getEvolution;
