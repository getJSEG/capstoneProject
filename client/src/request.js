import axios from 'axios';


axios.defaults.withCredentials = true
const host = 'http://localhost:5000'

//get All Recipes
export const getRecipes = (pageNumber, nPerPage) => {
  return axios.get(`${host}/recipes?page=${pageNumber}&limit=${nPerPage}`)
}

//seach search recipes
export const searchRecipes = (query, pageNumber, nPerPage) => {
  return axios.get(`${host}/recipes/search/?tags=${query}&page=${pageNumber}&limit=${nPerPage}`)
}

//get recipes from a specific ID
 export const getSingleRecipe = (Id) => { return axios.get(`${host}/recipes/recipe/${Id}`); }

//user authetication
export const userprofile = () => { return  axios.get(`${host}/profile`, { method: "get" }).catch( err => { return '403'; }) }

export const savedRecipes = (pageNumber, nPerPage) => { return axios.get(`${host}/profile/savedRecipes/?page=${pageNumber}&limit=${nPerPage}`) }

//SAVE RECIPES
export const saveRecipe = (Id) => {  return axios.put(`${host}/saved/add/${Id}`, { method: "put" }); }

//Delete Recipes
export const removeRecipe = (Id) => { return axios.put(`${host}/saved/remove/${Id}`,{ method: "put" }) }

// Youtube API return yourube videos from a sertain keyword
export const getYoutubeVideos = (keyword) => {
  const encodedKeyWord = encodeURIComponent(keyword);
  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedKeyWord}&maxResults=10&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
}
