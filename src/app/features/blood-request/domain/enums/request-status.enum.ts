export enum RequestStatus {
  PendingDoctorReview = 1,
  PendingBloodBank = 2,
  Shortage = 3,
  PartiallyAllocated = 4,
  Processing = 5,
  Fulfilled = 6,
  Cancelled = 7,
  Rejected = 8
}

export const REQUEST_STATUS_OPTIONS = [
  {
    value: RequestStatus.PendingDoctorReview,
    label: 'Blood-Request-Status-Keys.PENDING_DOCTOR_REVIEW'
  },
  {
    value: RequestStatus.PendingBloodBank,
    label: 'Blood-Request-Status-Keys.PENDING_BLOOD_BANK'
  },
  {
    value: RequestStatus.Shortage,
    label: 'Blood-Request-Status-Keys.SHORTAGE'
  },
  {
    value: RequestStatus.PartiallyAllocated,
    label: 'Blood-Request-Status-Keys.PARTIALLY_ALLOCATED'
  },
  {
    value: RequestStatus.Processing,
    label: 'Blood-Request-Status-Keys.PROCESSING'
  },
  {
    value: RequestStatus.Fulfilled,
    label: 'Blood-Request-Status-Keys.FULFILLED'
  },
  {
    value: RequestStatus.Cancelled,
    label: 'Blood-Request-Status-Keys.CANCELLED'
  },
  {
    value: RequestStatus.Rejected,
    label: 'Blood-Request-Status-Keys.REJECTED'
  }
];
