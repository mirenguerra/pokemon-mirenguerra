const URL = "https://pokeapi.co/api/v2/pokemon/";

const getList = () => {
  return fetch(`${URL}?limit=25`).then(res => res.json());
};
export default getList;
