import { environment } from "../config/environments/environment";


export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/Auth/registerCitizen`,
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

  branchManagement: {
    getAllBranchesEndpoint: `${API_BASE_URL}/branches-management`,
    getBranchByIdEndpoint: `${API_BASE_URL}/branches-management/{branchId}`,
    getBranchesStatisticsEndpoint: `${API_BASE_URL}/branches-management/statistics`,
     getAvailableBranchManagersEndpoint: `${API_BASE_URL}/branches-management/available-managers`,
    addBranchEndpoint: `${API_BASE_URL}/branches-management`,
    updateBranchEndpoint: `${API_BASE_URL}/branches-management/{branchId}`,
    softDeleteBranchEndpoint: `${API_BASE_URL}/branches-management/{branchId}`,
    activateBranchEndpoint: `${API_BASE_URL}/branches-management/{branchId}/activate`,
    deactivateBranchEndpoint: `${API_BASE_URL}/branches-management/{branchId}/deactivate`,
  },
  hospitalManagement: {
    getAllHospitalsEndpoint: `${API_BASE_URL}/hospital-management`,
    getHospitalByIdEndpoint: `${API_BASE_URL}/hospital-management/{hospitalId}`,
    getHospitalsStatisticsEndpoint: `${API_BASE_URL}/hospital-management/statistics`,
     getAvailableDoctorsEndpoint: `${API_BASE_URL}/hospital-management/available-doctors`,
    addHospitalEndpoint: `${API_BASE_URL}/hospital-management`,
    updateHospitalEndpoint: `${API_BASE_URL}/hospital-management/{hospitalId}`,
    softDeleteHospitalEndpoint: `${API_BASE_URL}/hospital-management/{hospitalId}`,
    activateHospitalEndpoint: `${API_BASE_URL}/hospital-management/{hospitalId}/activate`,
    deactivateHospitalEndpoint: `${API_BASE_URL}/hospital-management/{hospitalId}/deactivate`,
  },
bloodRequests: {
  getCurrentCitizenDataEndpoint: `${API_BASE_URL}/blood-requests/citizen-data`,
  lookupBeneficiaryEndpoint: `${API_BASE_URL}/blood-requests/beneficiary-lookup/{nationalId}`,

  createBloodRequestEndpoint: `${API_BASE_URL}/blood-requests`,
  getMyBloodRequestsEndpoint: `${API_BASE_URL}/blood-requests/my`,
  getDoctorBloodRequestsEndpoint: `${API_BASE_URL}/blood-requests/doctor`,
  getBranchBloodRequestsEndpoint: `${API_BASE_URL}/blood-requests/branch`,
  getBloodRequestByIdEndpoint: `${API_BASE_URL}/blood-requests/{requestId}`,

  doctorReviewBloodRequestEndpoint: `${API_BASE_URL}/blood-requests/{requestId}/doctor-review`,
  employeeReviewBloodRequestEndpoint: `${API_BASE_URL}/blood-requests/{requestId}/employee-review`,
  confirmBloodRequestAllocationEndpoint: `${API_BASE_URL}/blood-requests/{requestId}/confirm-allocation`,
  publishBloodRequestEndpoint: `${API_BASE_URL}/blood-requests/{requestId}/publish`,
  rejectBloodRequestEndpoint: `${API_BASE_URL}/blood-requests/{requestId}/reject`,
  cancelBloodRequestEndpoint: `${API_BASE_URL}/blood-requests/{requestId}/cancel`
}

};
