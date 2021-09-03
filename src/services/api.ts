import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-podcastr.herokuapp.com/api/'
})