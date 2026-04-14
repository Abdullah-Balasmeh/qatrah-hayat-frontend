import { environment } from "../config/environments/environment";


export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/api/Auth/register`,
    login: `${API_BASE_URL}/api/Auth/login`,
    me: `${API_BASE_URL}/api/Auth/me`,
  },
  civilStatus: {
    get: `${API_BASE_URL}/api/CivilStatus/{nationalId}`
  },
  screening: {
    submit: `${API_BASE_URL}/api/Screening/submit`,
    get: `${API_BASE_URL}/api/Screening/questions`
  }


};
