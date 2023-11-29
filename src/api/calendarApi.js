

import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";


const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});


// TODO: configurar interseptores
calendarApi.interceptors.request.use( config => {
  config.headers={
    ...config,
    'x-token': localStorage.getItem('token'),
  }
  return config;
});


export default calendarApi;
