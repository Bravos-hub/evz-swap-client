src/
  index.js
  App.js

  router/
    routes.js          // All route constants in one place
    AppRouter.js       // <BrowserRouter> + <Routes>

  layout/
    EvzScreen.js       // Shared layout wrapper used by almost every screen
    AppShell.js        // Optional: global header / nav / toasts

  styles/
    evz.css            // Global styles (from your evzStyles strings)
    reset.css          // (optional) simple CSS reset

  screens/
    auth/
      SplashScreen.jsx
      LanguageSelectScreen.jsx
      PermissionIntroScreen.jsx
      PhoneEntryScreen.jsx
      OtpVerifyScreen.jsx

    onboarding/
      ProfileSetupScreen.jsx
      VehicleSelectScreen.jsx
      ProviderSelectScreen.jsx
      NoStationsFoundScreen.jsx

    stations/
      StationMapListScreen.jsx
      StationDetailsSheet.jsx
      SearchStationsScreen.jsx
      FiltersSheet.jsx
      FavoritesStationsScreen.jsx
      LocationPermissionScreen.jsx
      GpsDisabledScreen.jsx
      MapProviderUnavailableScreen.jsx
      LocationOutOfBoundsScreen.jsx

    booking/
      HoldSelectScreen.jsx
      BookingPaymentScreen.jsx
      BookingCountdownScreen.jsx
      ExtendHoldScreen.jsx
      ExtendPaymentScreen.jsx
      TimeExtendedScreen.jsx
      BookingExpiredScreen.jsx
      BookingCancelConfirmScreen.jsx

    swap/
      ArrivedShowQrScreen.jsx
      OperatorSwapPaymentScreen.jsx
      SafetyChecklistScreen.jsx
      StationIdentifyScanScreen.jsx
      StationIdentifyCodeScreen.jsx
      LockerAssignedScreen.jsx
      ScanReturnBatteryScreen.jsx
      InsertReturnWaitDetectScreen.jsx
      ReturnDetectedSummaryScreen.jsx
      EnergyPaymentScreen.jsx
      CollectNewBatteryScreen.jsx
      ScanNewBatteryScreen.jsx
      SwapCompletedSummaryScreen.jsx
      SwapCompletedRatingScreen.jsx
      RateExperienceScreen.jsx

    wallet/
      WalletHomeScreen.jsx
      PaymentMethodsScreen.jsx
      TopUpScreen.jsx
      TransactionsListScreen.jsx
      TransactionDetailsScreen.jsx
      InvoicesScreen.jsx
      PaymentFailedScreen.jsx
      PaymentPendingScreen.jsx
      RefundIssuedScreen.jsx

    history/
      SwapSessionsScreen.jsx
      SwapSessionDetailsScreen.jsx
      ExportHistoryScreen.jsx

    dashboard/
      DashboardOverviewScreen.jsx
      CarbonSavingsDetailScreen.jsx
      BatteryHealthDetailScreen.jsx

    profile/
      ProfileScreen.jsx
      VehicleDetailsScreen.jsx
      VehicleEditScreen.jsx
      VehicleRemoveConfirmScreen.jsx
      LanguageRegionScreen.jsx
      NotificationSettingsScreen.jsx
      LockWalletScreen.jsx
      TwoFactorSetupScreen.jsx
      SessionManagementScreen.jsx
      TermsPrivacyScreen.jsx
      DataConsentScreen.jsx
      DeleteAccountScreen.jsx
      PromotionsScreen.jsx
      ReferralsScreen.jsx

    support/
      HelpCenterScreen.jsx
      ContactSupportScreen.jsx
      ReportIssueScreen.jsx

    system/
      OfflineModeScreen.jsx
      NetworkErrorScreen.jsx
      MaintenanceScreen.jsx
      CameraPermissionScreen.jsx
      NotificationsPermissionScreen.jsx
      LockerTimeoutScreen.jsx
      LockerReassignScreen.jsx
      EscalateToOperatorScreen.jsx
      InvalidStationQrScreen.jsx
      BatteryQrUnreadableScreen.jsx
      BatteryMismatchScreen.jsx

  shared/
    components/
      EvzButton.jsx
      EvzTextField.jsx
      EvzTag.jsx
      // etc, pulled out of repeated JSX pieces

    hooks/
      useSession.js
      useBooking.js
      useWallet.js

    api/
      authApi.js
      stationsApi.js
      swapApi.js
      walletApi.js

    utils/
      formatters.js
      validators.js
