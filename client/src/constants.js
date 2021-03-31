import { lazy } from 'react';
import {
  MdDescription,
  MdAssignmentTurnedIn,
  MdAttachMoney,
  MdAddShoppingCart,
  MdLocalShipping,
  MdVerifiedUser,
  MdAccountBalance,
  MdGavel,
} from 'react-icons/md';
import Logo from './components/common/Logo.jsx';
export const hq = {
  longitude: -73.745181,
  latitude: 45.4644455,
};
export const mapLayerID = 'mapLayer';
export const shippingStates = [
  'Ordered',
  'Packaged',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Delayed',
];
export const shippingStatesHide = ['Delivered', 'Cancelled'];
export const rolesAvailable = ['Admin', 'General'];
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const carouselContent = [
  {
    title: 'Monitor and Manage your Inventories',
    imgName: '/assets/inventory.jpg',
  },
  {
    title: 'Track your Shipments',
    imgName: '/assets/transport.jpg',
  },
  {
    title: 'View your Orders',
    imgName: '/assets/vendor.jpg',
  },
  {
    title: "Analyze and View your Company's Finances",
    imgName: '/assets/accounting.jpg',
  },
  {
    title: 'Forecast your Sales',
    imgName: '/assets/planning.jpg',
  },
  {
    title: "Manage Customers' Purchases",
    imgName: '/assets/sales.jpg',
  },
];
export const salesStatus = ['Fulfilled', 'Placed', 'Cancelled', 'Processing'];

export const appRoutes = [
  {
    name: 'Dashboard',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/main',
    component: lazy(() => import('components/views/MainDashboard')),
    icon: Logo,
    active: false,
  },
  {
    name: 'Admin',
    protected: true,
    allowedRoles: ['Admin'],
    path: '/admin',
    component: lazy(() => import('components/views/AdminPage.jsx')),
    icon: MdVerifiedUser,
    active: false,
  },
  {
    name: 'Inventory',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/inventory',
    component: lazy(() => import('components/views/Inventory')),
    icon: MdDescription,
    active: false,
  },
  {
    name: 'Orders',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/orders',
    component: lazy(() => import('components/views/Orders')),
    icon: MdAddShoppingCart,
    active: false,
  },
  {
    name: 'Quality Management',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/quality-management',
    component: lazy(() => import('components/views/QualityManagement')),
    icon: MdAssignmentTurnedIn,
    active: false,
  },
  {
    name: 'Shipping',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/shipping',
    component: lazy(() => import('components/views/Shipping')),
    icon: MdLocalShipping,
    active: false,
  },
  {
    name: 'Sales',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/sales',
    component: lazy(() => import('components/views/Sales')),
    icon: MdAttachMoney,
    active: false,
  },
  {
    name: 'Accounting',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/accounting',
    component: lazy(() => import('components/views/Accounting')),
    icon: MdAccountBalance,
    active: false,
  },
  {
    name: 'Audit Trail',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/audit',
    component: lazy(() => import('components/views/AuditTrail')),
    icon: MdGavel,
    active: false,
  },
  {
    name: 'Schedulings',
    protected: true,
    allowedRoles: rolesAvailable,
    path: '/schedulings',
    component: lazy(() => import('components/views/SchedulingPage')),
  },
  {
    protected: false,
    path: '/login',
    component: lazy(() => import('components/views/Login')),
    exact: true,
  },
  {
    protected: false,
    path: '/no-access',
    component: lazy(() => import('components/views/NoAccess')),
  },
  {
    protected: false,
    path: '/bye',
    component: lazy(() => import('components/views/Inactive')),
  },
  {
    protected: false,
    path: '/',
    component: lazy(() => import('components/views/LandingPage')),
    exact: true,
  },
  {
    protected: false,
    path: '*',
    component: lazy(() => import('components/views/NotFound')),
  },
];
