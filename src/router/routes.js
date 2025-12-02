// All route constants in one place
export const ROUTES = {
  // Auth
  SPLASH: '/',
  LANGUAGE_SELECT: '/language',
  PERMISSION_INTRO: '/permissions',
  PHONE_ENTRY: '/auth/phone',
  OTP_VERIFY: '/auth/otp',
  
  // Onboarding
  PROFILE_SETUP: '/onboarding/profile',
  VEHICLE_SELECT: '/onboarding/vehicle',
  PROVIDER_SELECT: '/onboarding/provider',
  NO_STATIONS_FOUND: '/onboarding/no-stations',
  
  // Stations
  STATION_MAP_LIST: '/stations',
  STATION_DETAILS: '/stations/:id',
  SEARCH_STATIONS: '/stations/search',
  FILTERS: '/stations/filters',
  FAVORITES: '/stations/favorites',
  LOCATION_PERMISSION: '/stations/location-permission',
  GPS_DISABLED: '/stations/gps-disabled',
  MAP_PROVIDER_UNAVAILABLE: '/stations/map-unavailable',
  LOCATION_OUT_OF_BOUNDS: '/stations/out-of-bounds',
  
  // Booking
  HOLD_SELECT: '/booking/hold',
  BOOKING_PAYMENT: '/booking/payment',
  BOOKING_COUNTDOWN: '/booking/countdown',
  BOOKING_CONFIRMED: '/booking/confirmed', // Alias for countdown screen
  EXTEND_HOLD: '/booking/extend',
  EXTEND_PAYMENT: '/booking/extend-payment',
  TIME_EXTENDED: '/booking/time-extended',
  BOOKING_EXPIRED: '/booking/expired',
  BOOKING_CANCEL: '/booking/cancel',
  
  // Swap
  ARRIVED_SHOW_QR: '/swap/arrived',
  OPERATOR_SWAP_PAYMENT: '/swap/operator/payment',
  OPERATOR_SWAP_PAY: '/swap/operator/pay', // Alias for OPERATOR_SWAP_PAYMENT
  SAFETY_CHECKLIST: '/swap/safety',
  SAFETY_CHECKLIST_SELF: '/swap/self/safety', // Alternative route for self-service flow
  STATION_IDENTIFY_SCAN: '/swap/station/scan',
  STATION_IDENTIFY_SCAN_SELF: '/swap/self/station-scan', // Alternative route for self-service flow
  STATION_IDENTIFY_CODE: '/swap/station/code',
  STATION_IDENTIFY_CODE_SELF: '/swap/self/station-code', // Alternative route for self-service flow
  LOCKER_ASSIGNED: '/swap/locker',
  LOCKER_ASSIGNED_SELF: '/swap/self/locker', // Alternative route for self-service flow
  SCAN_RETURN_BATTERY: '/swap/return/scan',
  SCAN_RETURN_BATTERY_SELF: '/swap/self/scan-return', // Alternative route for self-service flow
  INSERT_RETURN_WAIT: '/swap/return/insert',
  INSERT_RETURN_WAIT_SELF: '/swap/self/insert-return', // Alternative route for self-service flow
  RETURN_DETECTED: '/swap/return/detected',
  RETURN_DETECTED_SELF: '/swap/self/return-detected', // Alternative route for self-service flow
  ENERGY_PAYMENT: '/swap/energy/payment',
  ENERGY_PAYMENT_SELF: '/swap/self/pay', // Alternative route for self-service flow
  COLLECT_NEW_BATTERY: '/swap/collect',
  COLLECT_NEW_BATTERY_SELF: '/swap/self/collect', // Alternative route for self-service flow
  SCAN_NEW_BATTERY: '/swap/new/scan',
  SCAN_NEW_BATTERY_SELF: '/swap/self/scan-new', // Alternative route for self-service flow
  SWAP_COMPLETED_SUMMARY: '/swap/completed',
  SWAP_COMPLETED_SUMMARY_SELF: '/swap/self/done', // Alternative route for self-service flow
  SWAP_COMPLETED_RATING: '/swap/rating',
  RATE_EXPERIENCE: '/swap/rate',
  RATE_EXPERIENCE_SELF: '/swap/self/rate', // Alternative route for self-service flow
  
  // Wallet
  WALLET_HOME: '/wallet',
  PAYMENT_METHODS: '/wallet/methods',
  TOP_UP: '/wallet/top-up',
  TRANSACTIONS_LIST: '/wallet/transactions',
  TRANSACTION_DETAILS: '/wallet/transactions/:id',
  INVOICES: '/wallet/invoices',
  PAYMENT_FAILED: '/wallet/payment-failed',
  PAYMENT_PENDING: '/wallet/payment-pending',
  REFUND_ISSUED: '/wallet/refund',
  
  // History
  SWAP_SESSIONS: '/history',
  SWAP_SESSION_DETAILS: '/history/:id',
  EXPORT_HISTORY: '/history/export',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  CARBON_SAVINGS: '/dashboard/carbon',
  BATTERY_HEALTH: '/dashboard/battery',
  
  // Profile
  PROFILE: '/profile',
  VEHICLE_DETAILS: '/profile/vehicle/:id',
  VEHICLE_EDIT: '/profile/vehicle/:id/edit',
  VEHICLE_REMOVE: '/profile/vehicle/:id/remove',
  LANGUAGE_REGION: '/profile/language',
  NOTIFICATION_SETTINGS: '/profile/notifications',
  LOCK_WALLET: '/profile/lock-wallet',
  TWO_FACTOR_SETUP: '/profile/2fa',
  SESSION_MANAGEMENT: '/profile/sessions',
  TERMS_PRIVACY: '/profile/terms',
  DATA_CONSENT: '/profile/data-consent',
  DELETE_ACCOUNT: '/profile/delete',
  PROMOTIONS: '/profile/promotions',
  REFERRALS: '/profile/referrals',
  PROVIDER_PLANS: '/profile/provider-plans',
  
  // Support
  HELP_CENTER: '/support/help',
  CONTACT_SUPPORT: '/support/contact',
  REPORT_ISSUE: '/support/report',
  
  // System
  OFFLINE_MODE: '/system/offline',
  NETWORK_ERROR: '/system/network-error',
  MAINTENANCE: '/system/maintenance',
  CAMERA_PERMISSION: '/system/camera-permission',
  NOTIFICATIONS_PERMISSION: '/system/notifications-permission',
  LOCKER_TIMEOUT: '/system/locker-timeout',
  LOCKER_REASSIGN: '/system/locker-reassign',
  ESCALATE_TO_OPERATOR: '/system/escalate',
  INVALID_STATION_QR: '/system/invalid-station-qr',
  BATTERY_QR_UNREADABLE: '/system/battery-qr-unreadable',
  BATTERY_MISMATCH: '/system/battery-mismatch',
};

