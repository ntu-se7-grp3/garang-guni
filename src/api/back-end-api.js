import axios from "axios";

const BASE_URL = 'https://6698c57b2069c438cd6feb5e.mockapi.io';

const backEnd = axios.create({ baseURL: BASE_URL});

export default backEnd;