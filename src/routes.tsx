import { createBrowserRouter } from 'react-router';
import { RoleLanding } from './components/RoleLanding';
import { AuthLanding } from './components/auth/AuthLanding';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { UserRoot } from './components/UserRoot';
import { CommunityFeed } from './components/CommunityFeed';
import { CategoryOffers } from './components/CategoryOffers';
import { OfferDetail } from './components/OfferDetail';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile';
import { AppearanceSettings } from './components/AppearanceSettings';
import { LanguageSettings } from './components/LanguageSettings';
import { NotificationSettings } from './components/NotificationSettings';
import { SupportSettings } from './components/SupportSettings';
import { JoinCommunity } from './components/JoinCommunity';
import { BusinessRoot } from './components/business/BusinessRoot';
import { BusinessDashboard } from './components/business/BusinessDashboard';
import { BusinessOffers } from './components/business/BusinessOffers';
import { CreateOffer } from './components/business/CreateOffer';
import { BusinessProfile } from './components/business/BusinessProfile';
import { BusinessAnalytics } from './components/business/BusinessAnalytics';
import { ScanMember } from './components/business/ScanMember';
import { AdminRoot } from './components/admin/AdminRoot';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminCommunities } from './components/admin/AdminCommunities';
import { AdminBusinesses } from './components/admin/AdminBusinesses';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminProfile } from './components/admin/AdminProfile';
import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { AdminBusinessAnalyticsDetail } from './components/admin/AdminBusinessAnalyticsDetail';
import { AdminOfferAnalyticsDetail } from './components/admin/AdminOfferAnalyticsDetail';
import { AdminCommunityBuilder } from './components/admin/AdminCommunityBuilder';
import { BusinessCommunityPage } from './components/business/BusinessCommunityPage';

export const router = createBrowserRouter([
  { path: '/', Component: RoleLanding },
  { path: '/auth', Component: AuthLanding },
  { path: '/auth/login', Component: Login },
  { path: '/auth/register', Component: Register },
  {
    path: '/user',
    Component: UserRoot,
    children: [
      { index: true, Component: CommunityFeed },
      { path: 'community/:id', Component: CategoryOffers },
      { path: 'offer/:id', Component: OfferDetail },
      { path: 'profile', Component: Profile },
      { path: 'profile/edit', Component: EditProfile },
      { path: 'profile/appearance', Component: AppearanceSettings },
      { path: 'profile/language', Component: LanguageSettings },
      { path: 'profile/notifications', Component: NotificationSettings },
      { path: 'profile/support', Component: SupportSettings },
      { path: 'join-community', Component: JoinCommunity },
    ],
  },
  {
    path: '/business',
    Component: BusinessRoot,
    children: [
      { index: true, Component: BusinessDashboard },
      { path: 'offers', Component: BusinessOffers },
      { path: 'offers/new', Component: CreateOffer },
      { path: 'analytics', Component: BusinessAnalytics },
      { path: 'scan', Component: ScanMember },
      { path: 'profile', Component: BusinessProfile },
      { path: 'community/:id', Component: BusinessCommunityPage },
    ],
  },
  {
    path: '/admin',
    Component: AdminRoot,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'communities', Component: AdminCommunities },
      { path: 'businesses', Component: AdminBusinesses },
      { path: 'users', Component: AdminUsers },
      { path: 'profile', Component: AdminProfile },
      { path: 'language', Component: LanguageSettings },
      { path: 'support', Component: SupportSettings },
      { path: 'notifications', Component: NotificationSettings },
      { path: 'analytics', Component: AdminAnalytics },
      { path: 'analytics/business/:id', Component: AdminBusinessAnalyticsDetail },
      { path: 'analytics/offer/:id', Component: AdminOfferAnalyticsDetail },
      { path: 'community/:id', Component: AdminCommunityBuilder },
    ],
  },
]);
