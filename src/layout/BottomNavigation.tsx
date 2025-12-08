import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import HomeIcon from '@mui/icons-material/Home';
import ChargingStationIcon from '@mui/icons-material/ChargingStation';
import HistoryIcon from '@mui/icons-material/History';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';

const navStyles = `
.evz-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0 max(8px, env(safe-area-inset-bottom));
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  max-width: 430px;
  margin: 0 auto;
}

/* Add padding to screens when navigation is visible */
body.evz-nav-visible .evz-screen {
  padding-bottom: calc(20px + 72px);
}

.evz-bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 12px;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  color: #6b7280;
  transition: color 0.2s ease;
  min-width: 60px;
  flex: 1;
}

.evz-bottom-nav-item:hover {
  color: #374151;
}

.evz-bottom-nav-item--active {
  color: var(--evz-accent);
}

.evz-bottom-nav-icon {
  font-size: 24px;
  line-height: 1;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.evz-bottom-nav-label {
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
}

.evz-bottom-nav-item--active .evz-bottom-nav-label {
  font-weight: 600;
}

/* Responsive styles for 320px - 420px range */
@media (max-width: 420px) {
  .evz-bottom-nav {
    max-width: 100%;
  }
  
  .evz-bottom-nav-item {
    padding: 4px 8px;
    min-width: 50px;
  }
  
  .evz-bottom-nav-label {
    font-size: 10px;
  }
  
  .evz-bottom-nav-icon {
    font-size: 22px;
  }
}

@media (max-width: 370px) {
  .evz-bottom-nav-item {
    padding: 4px 6px;
    min-width: 48px;
  }
  
  .evz-bottom-nav-label {
    font-size: 9px;
  }
  
  .evz-bottom-nav-icon {
    font-size: 20px;
  }
}

@media (max-width: 360px) {
  .evz-bottom-nav-item {
    padding: 4px 5px;
    min-width: 46px;
  }
  
  .evz-bottom-nav-label {
    font-size: 9px;
  }
  
  .evz-bottom-nav-icon {
    font-size: 19px;
  }
}

@media (max-width: 340px) {
  .evz-bottom-nav-item {
    padding: 4px 4px;
    min-width: 44px;
    gap: 3px;
  }
  
  .evz-bottom-nav-label {
    font-size: 8px;
  }
  
  .evz-bottom-nav-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 320px) {
  .evz-bottom-nav-item {
    padding: 4px 3px;
    min-width: 42px;
    gap: 2px;
  }
  
  .evz-bottom-nav-label {
    font-size: 8px;
    line-height: 1.1;
  }
  
  .evz-bottom-nav-icon {
    font-size: 17px;
    width: 17px;
    height: 17px;
  }
}
`;

interface NavItem {
  id: string;
  label: string;
  route: string;
  icon: React.ComponentType<{ sx?: { fontSize: string } }>;
  routes: string[];
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    route: ROUTES.DASHBOARD,
    icon: HomeIcon,
    routes: [ROUTES.DASHBOARD, ROUTES.CARBON_SAVINGS, ROUTES.BATTERY_HEALTH],
  },
  {
    id: 'stations',
    label: 'Stations',
    route: ROUTES.STATION_MAP_LIST,
    icon: ChargingStationIcon,
    routes: [
      ROUTES.STATION_MAP_LIST,
      ROUTES.SEARCH_STATIONS,
      ROUTES.FILTERS,
      ROUTES.FAVORITES,
      ROUTES.STATION_DETAILS,
    ],
  },
  {
    id: 'history',
    label: 'History',
    route: ROUTES.SWAP_SESSIONS,
    icon: HistoryIcon,
    routes: [ROUTES.SWAP_SESSIONS, ROUTES.SWAP_SESSION_DETAILS, ROUTES.EXPORT_HISTORY],
  },
  {
    id: 'wallet',
    label: 'Wallet',
    route: ROUTES.WALLET_HOME,
    icon: AccountBalanceWalletIcon,
    routes: [
      ROUTES.WALLET_HOME,
      ROUTES.TOP_UP,
      ROUTES.TOP_UP_ALIAS,
      ROUTES.PAYMENT_METHODS,
      ROUTES.TRANSACTIONS_LIST,
      ROUTES.TRANSACTION_DETAILS,
      ROUTES.INVOICES,
    ],
  },
  {
    id: 'profile',
    label: 'Profile',
    route: ROUTES.PROFILE,
    icon: PersonIcon,
    routes: [
      ROUTES.PROFILE,
      ROUTES.VEHICLE_DETAILS,
      ROUTES.VEHICLE_EDIT,
      ROUTES.VEHICLE_REMOVE,
      ROUTES.LANGUAGE_REGION,
      ROUTES.NOTIFICATION_SETTINGS,
      ROUTES.LOCK_WALLET,
      ROUTES.TWO_FACTOR_SETUP,
      ROUTES.SESSION_MANAGEMENT,
      ROUTES.TERMS_PRIVACY,
      ROUTES.DATA_CONSENT,
      ROUTES.DELETE_ACCOUNT,
      ROUTES.PROMOTIONS,
      ROUTES.REFERRALS,
      ROUTES.PROVIDER_PLANS,
    ],
  },
];

// Routes where navigation should be hidden
const hiddenRoutes: string[] = [
  ROUTES.SPLASH,
  ROUTES.LANGUAGE_SELECT,
  ROUTES.PERMISSION_INTRO,
  ROUTES.PHONE_ENTRY,
  ROUTES.OTP_VERIFY,
  ROUTES.PROFILE_SETUP,
  ROUTES.VEHICLE_SELECT,
  ROUTES.PROVIDER_SELECT,
  ROUTES.NO_STATIONS_FOUND,
  // Booking flow
  ROUTES.HOLD_SELECT,
  ROUTES.BOOKING_PAYMENT,
  ROUTES.BOOKING_COUNTDOWN,
  ROUTES.BOOKING_CONFIRMED,
  ROUTES.EXTEND_HOLD,
  ROUTES.EXTEND_PAYMENT,
  ROUTES.TIME_EXTENDED,
  ROUTES.BOOKING_EXPIRED,
  ROUTES.BOOKING_CANCEL,
  // Swap flow
  ROUTES.ARRIVED_SHOW_QR,
  ROUTES.OPERATOR_SWAP_PAYMENT,
  ROUTES.OPERATOR_SWAP_PAY,
  ROUTES.SAFETY_CHECKLIST,
  ROUTES.SAFETY_CHECKLIST_SELF,
  ROUTES.STATION_IDENTIFY_SCAN,
  ROUTES.STATION_IDENTIFY_SCAN_SELF,
  ROUTES.STATION_IDENTIFY_CODE,
  ROUTES.STATION_IDENTIFY_CODE_SELF,
  ROUTES.LOCKER_ASSIGNED,
  ROUTES.LOCKER_ASSIGNED_SELF,
  ROUTES.SCAN_RETURN_BATTERY,
  ROUTES.SCAN_RETURN_BATTERY_SELF,
  ROUTES.INSERT_RETURN_WAIT,
  ROUTES.INSERT_RETURN_WAIT_SELF,
  ROUTES.RETURN_DETECTED,
  ROUTES.RETURN_DETECTED_SELF,
  ROUTES.ENERGY_PAYMENT,
  ROUTES.ENERGY_PAYMENT_SELF,
  ROUTES.COLLECT_NEW_BATTERY,
  ROUTES.COLLECT_NEW_BATTERY_SELF,
  ROUTES.SCAN_NEW_BATTERY,
  ROUTES.SCAN_NEW_BATTERY_SELF,
  ROUTES.SWAP_COMPLETED_SUMMARY,
  ROUTES.SWAP_COMPLETED_SUMMARY_SELF,
  ROUTES.SWAP_COMPLETED_RATING,
  ROUTES.RATE_EXPERIENCE,
  ROUTES.RATE_EXPERIENCE_SELF,
  // System/Error screens
  ROUTES.OFFLINE_MODE,
  ROUTES.NETWORK_ERROR,
  ROUTES.MAINTENANCE,
  ROUTES.CAMERA_PERMISSION,
  ROUTES.NOTIFICATIONS_PERMISSION,
  ROUTES.LOCKER_TIMEOUT,
  ROUTES.LOCKER_REASSIGN,
  ROUTES.ESCALATE_TO_OPERATOR,
  ROUTES.INVALID_STATION_QR,
  ROUTES.BATTERY_QR_UNREADABLE,
  ROUTES.BATTERY_MISMATCH,
  ROUTES.LOCATION_PERMISSION,
  ROUTES.GPS_DISABLED,
  ROUTES.MAP_PROVIDER_UNAVAILABLE,
  ROUTES.LOCATION_OUT_OF_BOUNDS,
  // Payment screens
  ROUTES.PAYMENT_FAILED,
  ROUTES.PAYMENT_PENDING,
  ROUTES.REFUND_ISSUED,
  // Support screens
  ROUTES.HELP_CENTER,
  ROUTES.CONTACT_SUPPORT,
  ROUTES.REPORT_ISSUE,
];

function useNavStyles(): void {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const styleId = 'evz-bottom-nav-styles';
    const existing = document.getElementById(styleId);
    if (existing) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = navStyles;
    document.head.appendChild(style);

    return () => {
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);
}

export default function BottomNavigation(): JSX.Element | null {
  useNavStyles();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if navigation should be hidden for current route
  const shouldHide = React.useMemo(() => {
    const currentPath = location.pathname;
    
    // Check exact matches
    if (hiddenRoutes.includes(currentPath)) {
      return true;
    }

    // Check dynamic routes (e.g., /stations/:id, /history/:id)
    const isDynamicRoute = hiddenRoutes.some(route => {
      if (!route) return false;
      if (route.includes(':')) {
        const routePattern = route.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${routePattern}$`);
        return regex.test(currentPath);
      }
      return false;
    });

    if (isDynamicRoute) {
      return true;
    }

    // Check if it matches patterns that should hide navigation
    // Note: Station/history/wallet/profile detail pages should show nav
    const excludePatterns = [
      /^\/booking\//,
      /^\/swap\//,
      /^\/onboarding\//,
      /^\/auth\//,
      /^\/system\//,
      /^\/support\//,
      /^\/wallet\/payment-(failed|pending)$/,
      /^\/wallet\/refund$/,
    ];

    return excludePatterns.some(pattern => pattern.test(currentPath));
  }, [location.pathname]);

  // Determine active tab
  const getActiveTab = (): string | null => {
    const currentPath = location.pathname;
    
    for (const item of navItems) {
      // Check if current path matches any route in this tab's routes
      for (const route of item.routes) {
        if (!route) continue; // Skip undefined routes
        if (route === currentPath) {
          return item.id;
        }
        // Handle dynamic routes (e.g., /stations/:id, /history/:id)
        if (route.includes(':')) {
          const routePattern = route.replace(/:[^/]+/g, '[^/]+');
          const regex = new RegExp(`^${routePattern}$`);
          if (regex.test(currentPath)) {
            return item.id;
          }
        }
      }
      
      // Also check if path starts with the base route
      if (item.route && currentPath.startsWith(item.route) && item.route !== '/') {
        return item.id;
      }
    }
    return null;
  };

  const activeTab = getActiveTab();

  // Add/remove body class based on visibility
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    
    if (shouldHide) {
      document.body.classList.remove('evz-nav-visible');
    } else {
      document.body.classList.add('evz-nav-visible');
    }

    return () => {
      document.body.classList.remove('evz-nav-visible');
    };
  }, [shouldHide]);

  if (shouldHide) {
    return null;
  }

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, route: string): void => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <nav className="evz-bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => handleNavClick(e, item.route)}
            className={`evz-bottom-nav-item ${isActive ? 'evz-bottom-nav-item--active' : ''}`}
            aria-label={`Navigate to ${item.label}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="evz-bottom-nav-icon">
              <item.icon sx={{ fontSize: 'inherit' }} />
            </span>
            <span className="evz-bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

