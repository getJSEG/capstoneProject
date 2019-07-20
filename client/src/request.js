import axios from 'axios';
import YOUTUBE_API_KEY from './config';

const url = 'http://localhost:5000';
axios.defaults.withCredentials = true

//get All Recipes
export const getRecipes = (pageNumber, nPerPage) => {
  return axios.get(`${url}/recipes?page=${pageNumber}&limit=${nPerPage}`)
}

//seach search recipes
export const searchRecipes = (query, pageNumber, nPerPage) => {
  return axios.get(`${url}/recipes/search/?tags=${query}&page=${pageNumber}&limit=${nPerPage}`)
}

//get recipes from a specific ID
 export const getSingleRecipe = (Id) => { return axios.get(`${url}/recipes/recipe/${Id}`); }

//user authetication
export const userprofile = () => { return  axios.get(`${url}/profile`, { method: "get" }).catch( err => { return '403'; }) }

export const savedRecipes = (pageNumber, nPerPage) => { return axios.get(`${url}/profile/savedRecipes/?page=${pageNumber}&limit=${nPerPage}`) }

//SAVE RECIPES
export const saveRecipe = (Id) => {  return axios.put(`${url}/saved/add/${Id}`, { method: "put" }); }

//Delete Recipes
export const removeRecipe = (Id) => { return axios.put(`${url}/saved/remove/${Id}`,{ method: "put" }) }

// Youtube API return yourube videos from a sertain keyword
export const getYoutubeVideos = (keyword) => {
  const encodedKeyWord = encodeURIComponent(keyword);
  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodedKeyWord}&maxResults=10&type=video&videoEmbeddable=true&key=${YOUTUBE_API_KEY}`);
}
