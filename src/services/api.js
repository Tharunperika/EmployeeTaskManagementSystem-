import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8010',
});

export default API;
