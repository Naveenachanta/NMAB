import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.swotandstudy.com/api', // <- NOTE the '/api' here
});

export default API;
