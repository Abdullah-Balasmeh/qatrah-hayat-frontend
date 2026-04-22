import { environment } from "../config/environments/environment";


export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/Auth/register`,
    login: `${API_BASE_URL}/Auth/login`,
    me: `${API_BASE_URL}/Auth/me`,
    forgotPassword: `${API_BASE_URL}/Auth/forgot-password`,
    verifyResetOtp: `${API_BASE_URL}/Auth/verify-reset-otp`,
    resetPassword: `${API_BASE_URL}/Auth/reset-password`,
  },
  civilStatus: {
    get: `${API_BASE_URL}/CivilStatus/{nationalId}`
  },
  screening: {
    submit: `${API_BASE_URL}/Screening/submit`,
    get: `${API_BASE_URL}/Screening/questions`
  },
  userManagement: {
    getAllStaffUsersEndpoint: `${API_BASE_URL}/users-management/staff`,
    getStaffByIdEndpoint: `${API_BASE_URL}/users-management/staff/{userId}`,
    addStaffEndpoint: `${API_BASE_URL}/users-management/staff`,
    updateStaffEndpoint: `${API_BASE_URL}/users-management/staff/{userId}`,
    getAllCitizenUsersEndpoint:`${API_BASE_URL}/users-management/citizens`,
    getCitizenByIdEndpoint: `${API_BASE_URL}/users-management/citizens/{userId}`,
    updateCitizenEndpoint: `${API_BASE_URL}/users-management/citizens/{userId}`,
    activateUserEndpoint: `${API_BASE_URL}/users-management/{userId}/activate`,
    deactivateUserEndpoint: `${API_BASE_URL}/users-management/{userId}/deactivate`,
    softDeleteUserEndpoint: `${API_BASE_URL}/users-management/{userId}`,
    getUsersStatisticsEndpoint: `${API_BASE_URL}/users-management/statistics`,
    lookupCitizenEndpoint: `${API_BASE_URL}/users-management/citizens/lookup/{nationalId}`,
    createStaffFromNationalRegistryEndpoint: `${API_BASE_URL}/users-management/staff/create-from-national-registry`,
    promoteCitizenToStaffEndpoint: `${API_BASE_URL}/users-management/citizens/{userId}/promote-to-staff`
  },

};
