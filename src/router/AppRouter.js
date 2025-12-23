import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import BottomNavigation from '../layout/BottomNavigation';

// Auth screens
import SplashScreen from '../screens/auth/SplashScreen';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import PermissionIntroScreen from '../screens/auth/PermissionIntroScreen';
import OtpVerifyScreen from '../screens/auth/OtpVerifyScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Onboarding screens
import VehicleSelectScreen from '../screens/onboarding/VehicleSelectScreen';
import ProviderSelectScreen from '../screens/onboarding/ProviderSelectScreen';
import NoStationsFoundScreen from '../screens/onboarding/NoStationsFoundScreen';

// Stations screens
import StationMapListScreen from '../screens/stations/StationMapListScreen';
import StationDetailsSheet from '../screens/stations/StationDetailsSheet';
import SearchStationsScreen from '../screens/stations/SearchStationsScreen';
import FiltersSheet from '../screens/stations/FiltersSheet';
import FavoritesStationsScreen from '../screens/stations/FavoritesStationsScreen';
import LocationPermissionScreen from '../screens/stations/LocationPermissionScreen';
import GpsDisabledScreen from '../screens/stations/GpsDisabledScreen';
import MapProviderUnavailableScreen from '../screens/stations/MapProviderUnavailableScreen';
import LocationOutOfBoundsScreen from '../screens/stations/LocationOutOfBoundsScreen';

// Booking screens
import HoldSelectScreen from '../screens/booking/HoldSelectScreen';
import BookingPaymentScreen from '../screens/booking/BookingPaymentScreen';
import BookingCountdownScreen from '../screens/booking/BookingCountdownScreen';
import ExtendHoldScreen from '../screens/booking/ExtendHoldScreen';
import ExtendPaymentScreen from '../screens/booking/ExtendPaymentScreen';
import TimeExtendedScreen from '../screens/booking/TimeExtendedScreen';
import BookingExpiredScreen from '../screens/booking/BookingExpiredScreen';
import BookingCancelConfirmScreen from '../screens/booking/BookingCancelConfirmScreen';

// Swap screens
import ArrivedShowQrScreen from '../screens/swap/ArrivedShowQrScreen';
import OperatorSwapPaymentScreen from '../screens/swap/OperatorSwapPaymentScreen';
import SafetyChecklistScreen from '../screens/swap/SafetyChecklistScreen';
import StationIdentifyScanScreen from '../screens/swap/StationIdentifyScanScreen';
import StationIdentifyCodeScreen from '../screens/swap/StationIdentifyCodeScreen';
import LockerAssignedScreen from '../screens/swap/LockerAssignedScreen';
import ScanReturnBatteryScreen from '../screens/swap/ScanReturnBatteryScreen';
import InsertReturnWaitDetectScreen from '../screens/swap/InsertReturnWaitDetectScreen';
import ReturnDetectedSummaryScreen from '../screens/swap/ReturnDetectedSummaryScreen';
import EnergyPaymentScreen from '../screens/swap/EnergyPaymentScreen';
import CollectNewBatteryScreen from '../screens/swap/CollectNewBatteryScreen';
import ScanNewBatteryScreen from '../screens/swap/ScanNewBatteryScreen';
import SwapCompletedSummaryScreen from '../screens/swap/SwapCompletedSummaryScreen';
import SwapCompletedRatingScreen from '../screens/swap/SwapCompletedRatingScreen';
import RateExperienceScreen from '../screens/swap/RateExperienceScreen';

// Wallet screens
import WalletHomeScreen from '../screens/wallet/WalletHomeScreen';
import PaymentMethodsScreen from '../screens/wallet/PaymentMethodsScreen';
import TopUpScreen from '../screens/wallet/TopUpScreen';
import TransactionsListScreen from '../screens/wallet/TransactionsListScreen';
import TransactionDetailsScreen from '../screens/wallet/TransactionDetailsScreen';
import InvoicesScreen from '../screens/wallet/InvoicesScreen';
import PaymentFailedScreen from '../screens/wallet/PaymentFailedScreen';
import PaymentPendingScreen from '../screens/wallet/PaymentPendingScreen';
import RefundIssuedScreen from '../screens/wallet/RefundIssuedScreen';

// History screens
import SwapSessionsScreen from '../screens/history/SwapSessionsScreen';
import SwapSessionDetailsScreen from '../screens/history/SwapSessionDetailsScreen';
import ExportHistoryScreen from '../screens/history/ExportHistoryScreen';

// Dashboard screens
import DashboardOverviewScreen from '../screens/dashboard/DashboardOverviewScreen';
import CarbonSavingsDetailScreen from '../screens/dashboard/CarbonSavingsDetailScreen';
import BatteryHealthDetailScreen from '../screens/dashboard/BatteryHealthDetailScreen';

// Profile screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import VehicleDetailsScreen from '../screens/profile/VehicleDetailsScreen';
import VehicleEditScreen from '../screens/profile/VehicleEditScreen';
import VehicleRemoveConfirmScreen from '../screens/profile/VehicleRemoveConfirmScreen';
import LanguageRegionScreen from '../screens/profile/LanguageRegionScreen';
import NotificationSettingsScreen from '../screens/profile/NotificationSettingsScreen';
import LockWalletScreen from '../screens/profile/LockWalletScreen';
import TwoFactorSetupScreen from '../screens/profile/TwoFactorSetupScreen';
import SessionManagementScreen from '../screens/profile/SessionManagementScreen';
import TermsPrivacyScreen from '../screens/profile/TermsPrivacyScreen';
import DataConsentScreen from '../screens/profile/DataConsentScreen';
import DeleteAccountScreen from '../screens/profile/DeleteAccountScreen';
import PromotionsScreen from '../screens/profile/PromotionsScreen';
import ReferralsScreen from '../screens/profile/ReferralsScreen';
import ProviderPlansScreen from '../screens/profile/ProviderPlansScreen';

// Support screens
import HelpCenterScreen from '../screens/support/HelpCenterScreen';
import ContactSupportScreen from '../screens/support/ContactSupportScreen';
import ReportIssueScreen from '../screens/support/ReportIssueScreen';

// System screens
import OfflineModeScreen from '../screens/system/OfflineModeScreen';
import NetworkErrorScreen from '../screens/system/NetworkErrorScreen';
import MaintenanceScreen from '../screens/system/MaintenanceScreen';
import CameraPermissionScreen from '../screens/system/CameraPermissionScreen';
import NotificationsPermissionScreen from '../screens/system/NotificationsPermissionScreen';
import LockerTimeoutScreen from '../screens/system/LockerTimeoutScreen';
import LockerReassignScreen from '../screens/system/LockerReassignScreen';
import EscalateToOperatorScreen from '../screens/system/EscalateToOperatorScreen';
import InvalidStationQrScreen from '../screens/system/InvalidStationQrScreen';
import BatteryQrUnreadableScreen from '../screens/system/BatteryQrUnreadableScreen';
import BatteryMismatchScreen from '../screens/system/BatteryMismatchScreen';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path={ROUTES.SPLASH} element={<SplashScreen />} />
        <Route path={ROUTES.LANGUAGE_SELECT} element={<LanguageSelectScreen />} />
        <Route path={ROUTES.PERMISSION_INTRO} element={<PermissionIntroScreen />} />
        <Route path={ROUTES.OTP_VERIFY} element={<OtpVerifyScreen />} />
        <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
        <Route path={ROUTES.SIGNUP} element={<SignupScreen />} />

        {/* Onboarding routes */}
        <Route path={ROUTES.VEHICLE_SELECT} element={<VehicleSelectScreen />} />
        <Route path={ROUTES.PROVIDER_SELECT} element={<ProviderSelectScreen />} />
        <Route path={ROUTES.PROVIDER_SELECT_ALIAS} element={<ProviderSelectScreen />} />
        <Route path={ROUTES.NO_STATIONS_FOUND} element={<NoStationsFoundScreen />} />

        {/* Stations routes */}
        <Route path={ROUTES.STATION_MAP_LIST} element={<StationMapListScreen />} />
        <Route path={ROUTES.STATION_DETAILS} element={<StationDetailsSheet />} />
        <Route path={ROUTES.SEARCH_STATIONS} element={<SearchStationsScreen />} />
        <Route path={ROUTES.FILTERS} element={<FiltersSheet />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesStationsScreen />} />
        <Route path={ROUTES.LOCATION_PERMISSION} element={<LocationPermissionScreen />} />
        <Route path={ROUTES.GPS_DISABLED} element={<GpsDisabledScreen />} />
        <Route path={ROUTES.MAP_PROVIDER_UNAVAILABLE} element={<MapProviderUnavailableScreen />} />
        <Route path={ROUTES.LOCATION_OUT_OF_BOUNDS} element={<LocationOutOfBoundsScreen />} />

        {/* Booking routes */}
        <Route path={ROUTES.HOLD_SELECT} element={<HoldSelectScreen />} />
        <Route path={ROUTES.BOOKING_PAYMENT} element={<BookingPaymentScreen />} />
        <Route path={ROUTES.BOOKING_COUNTDOWN} element={<BookingCountdownScreen />} />
        <Route path={ROUTES.BOOKING_CONFIRMED} element={<BookingCountdownScreen />} />
        <Route path={ROUTES.EXTEND_HOLD} element={<ExtendHoldScreen />} />
        <Route path={ROUTES.EXTEND_PAYMENT} element={<ExtendPaymentScreen />} />
        <Route path={ROUTES.TIME_EXTENDED} element={<TimeExtendedScreen />} />
        <Route path={ROUTES.BOOKING_EXPIRED} element={<BookingExpiredScreen />} />
        <Route path={ROUTES.BOOKING_CANCEL} element={<BookingCancelConfirmScreen />} />

        {/* Swap routes */}
        <Route path={ROUTES.ARRIVED_SHOW_QR} element={<ArrivedShowQrScreen />} />
        <Route path={ROUTES.OPERATOR_SWAP_PAYMENT} element={<OperatorSwapPaymentScreen />} />
        <Route path={ROUTES.OPERATOR_SWAP_PAY} element={<OperatorSwapPaymentScreen />} />
        <Route path={ROUTES.SAFETY_CHECKLIST} element={<SafetyChecklistScreen />} />
        <Route path={ROUTES.SAFETY_CHECKLIST_SELF} element={<SafetyChecklistScreen />} />
        <Route path={ROUTES.STATION_IDENTIFY_SCAN} element={<StationIdentifyScanScreen />} />
        <Route path={ROUTES.STATION_IDENTIFY_SCAN_SELF} element={<StationIdentifyScanScreen />} />
        <Route path={ROUTES.STATION_IDENTIFY_CODE} element={<StationIdentifyCodeScreen />} />
        <Route path={ROUTES.STATION_IDENTIFY_CODE_SELF} element={<StationIdentifyCodeScreen />} />
        <Route path={ROUTES.LOCKER_ASSIGNED} element={<LockerAssignedScreen />} />
        <Route path={ROUTES.LOCKER_ASSIGNED_SELF} element={<LockerAssignedScreen />} />
        <Route path={ROUTES.SCAN_RETURN_BATTERY} element={<ScanReturnBatteryScreen />} />
        <Route path={ROUTES.SCAN_RETURN_BATTERY_SELF} element={<ScanReturnBatteryScreen />} />
        <Route path={ROUTES.INSERT_RETURN_WAIT} element={<InsertReturnWaitDetectScreen />} />
        <Route path={ROUTES.INSERT_RETURN_WAIT_SELF} element={<InsertReturnWaitDetectScreen />} />
        <Route path={ROUTES.RETURN_DETECTED} element={<ReturnDetectedSummaryScreen />} />
        <Route path={ROUTES.RETURN_DETECTED_SELF} element={<ReturnDetectedSummaryScreen />} />
        <Route path={ROUTES.ENERGY_PAYMENT} element={<EnergyPaymentScreen />} />
        <Route path={ROUTES.ENERGY_PAYMENT_SELF} element={<EnergyPaymentScreen />} />
        <Route path={ROUTES.COLLECT_NEW_BATTERY} element={<CollectNewBatteryScreen />} />
        <Route path={ROUTES.COLLECT_NEW_BATTERY_SELF} element={<CollectNewBatteryScreen />} />
        <Route path={ROUTES.SCAN_NEW_BATTERY} element={<ScanNewBatteryScreen />} />
        <Route path={ROUTES.SCAN_NEW_BATTERY_SELF} element={<ScanNewBatteryScreen />} />
        <Route path={ROUTES.SWAP_COMPLETED_SUMMARY} element={<SwapCompletedSummaryScreen />} />
        <Route path={ROUTES.SWAP_COMPLETED_SUMMARY_SELF} element={<SwapCompletedSummaryScreen />} />
        <Route path={ROUTES.SWAP_COMPLETED_RATING} element={<SwapCompletedRatingScreen />} />
        <Route path={ROUTES.RATE_EXPERIENCE} element={<RateExperienceScreen />} />
        <Route path={ROUTES.RATE_EXPERIENCE_SELF} element={<RateExperienceScreen />} />

        {/* Wallet routes */}
        <Route path={ROUTES.WALLET_HOME} element={<WalletHomeScreen />} />
        <Route path={ROUTES.PAYMENT_METHODS} element={<PaymentMethodsScreen />} />
        <Route path={ROUTES.TOP_UP} element={<TopUpScreen />} />
        <Route path={ROUTES.TOP_UP_ALIAS} element={<TopUpScreen />} />
        <Route path={ROUTES.TRANSACTIONS_LIST} element={<TransactionsListScreen />} />
        <Route path={ROUTES.TRANSACTION_DETAILS} element={<TransactionDetailsScreen />} />
        <Route path={ROUTES.INVOICES} element={<InvoicesScreen />} />
        <Route path={ROUTES.PAYMENT_FAILED} element={<PaymentFailedScreen />} />
        <Route path={ROUTES.PAYMENT_PENDING} element={<PaymentPendingScreen />} />
        <Route path={ROUTES.REFUND_ISSUED} element={<RefundIssuedScreen />} />

        {/* History routes */}
        <Route path={ROUTES.SWAP_SESSIONS} element={<SwapSessionsScreen />} />
        <Route path={ROUTES.SWAP_SESSION_DETAILS} element={<SwapSessionDetailsScreen />} />
        <Route path={ROUTES.EXPORT_HISTORY} element={<ExportHistoryScreen />} />

        {/* Dashboard routes */}
        <Route path={ROUTES.DASHBOARD} element={<DashboardOverviewScreen />} />
        <Route path={ROUTES.CARBON_SAVINGS} element={<CarbonSavingsDetailScreen />} />
        <Route path={ROUTES.BATTERY_HEALTH} element={<BatteryHealthDetailScreen />} />

        {/* Profile routes */}
        <Route path={ROUTES.PROFILE} element={<ProfileScreen />} />
        <Route path={ROUTES.ACCOUNT} element={<ProfileScreen />} />
        <Route path={ROUTES.PROFILE_EDIT} element={<EditProfileScreen />} />
        <Route path={ROUTES.PROFILE_EDIT_ACCOUNT} element={<EditProfileScreen />} />
        <Route path={ROUTES.VEHICLE_DETAILS} element={<VehicleDetailsScreen />} />
        <Route path={ROUTES.VEHICLE_EDIT} element={<VehicleEditScreen />} />
        <Route path={ROUTES.VEHICLE_REMOVE} element={<VehicleRemoveConfirmScreen />} />
        <Route path={ROUTES.LANGUAGE_REGION} element={<LanguageRegionScreen />} />
        <Route path={ROUTES.LANGUAGE_REGION_ACCOUNT} element={<LanguageRegionScreen />} />
        <Route path={ROUTES.NOTIFICATION_SETTINGS} element={<NotificationSettingsScreen />} />
        <Route path={ROUTES.NOTIFICATION_SETTINGS_ACCOUNT} element={<NotificationSettingsScreen />} />
        <Route path={ROUTES.LOCK_WALLET} element={<LockWalletScreen />} />
        <Route path={ROUTES.TWO_FACTOR_SETUP} element={<TwoFactorSetupScreen />} />
        <Route path={ROUTES.SESSION_MANAGEMENT} element={<SessionManagementScreen />} />
        <Route path={ROUTES.TERMS_PRIVACY} element={<TermsPrivacyScreen />} />
        <Route path={ROUTES.DATA_CONSENT} element={<DataConsentScreen />} />
        <Route path={ROUTES.DELETE_ACCOUNT} element={<DeleteAccountScreen />} />
        <Route path={ROUTES.PROMOTIONS} element={<PromotionsScreen />} />
        <Route path={ROUTES.REFERRALS} element={<ReferralsScreen />} />
        <Route path={ROUTES.PROVIDER_PLANS} element={<ProviderPlansScreen />} />

        {/* Support routes */}
        <Route path={ROUTES.HELP_CENTER} element={<HelpCenterScreen />} />
        <Route path={ROUTES.CONTACT_SUPPORT} element={<ContactSupportScreen />} />
        <Route path={ROUTES.CONTACT_SUPPORT_ALIAS} element={<ContactSupportScreen />} />
        <Route path={ROUTES.REPORT_ISSUE} element={<ReportIssueScreen />} />

        {/* System routes */}
        <Route path={ROUTES.OFFLINE_MODE} element={<OfflineModeScreen />} />
        <Route path={ROUTES.NETWORK_ERROR} element={<NetworkErrorScreen />} />
        <Route path={ROUTES.MAINTENANCE} element={<MaintenanceScreen />} />
        <Route path={ROUTES.CAMERA_PERMISSION} element={<CameraPermissionScreen />} />
        <Route path={ROUTES.NOTIFICATIONS_PERMISSION} element={<NotificationsPermissionScreen />} />
        <Route path={ROUTES.LOCKER_TIMEOUT} element={<LockerTimeoutScreen />} />
        <Route path={ROUTES.LOCKER_REASSIGN} element={<LockerReassignScreen />} />
        <Route path={ROUTES.ESCALATE_TO_OPERATOR} element={<EscalateToOperatorScreen />} />
        <Route path={ROUTES.INVALID_STATION_QR} element={<InvalidStationQrScreen />} />
        <Route path={ROUTES.BATTERY_QR_UNREADABLE} element={<BatteryQrUnreadableScreen />} />
        <Route path={ROUTES.BATTERY_MISMATCH} element={<BatteryMismatchScreen />} />
      </Routes>
      <BottomNavigation />
    </BrowserRouter>
  );
}

export default AppRouter;

