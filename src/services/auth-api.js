import axios from 'axios';

const apiPrefix = '/api/v1';
const baseURL = `https://6697743402f3150fb66da86e.mockapi.io${apiPrefix}`;
const authApi = axios.create({ baseURL });

export default authApi;
