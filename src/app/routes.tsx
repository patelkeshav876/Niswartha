import { createBrowserRouter } from 'react-router';
import { Layout } from './layout';
import { Home } from './pages/Home';
import { AshramDetail } from './pages/AshramDetail';
import { Donation } from './pages/Donation';
import { DonationFlow } from './pages/DonationFlow';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Onboarding } from './pages/Onboarding';
import { Needs } from './pages/Needs';
import { Events } from './pages/Events';
import { SuggestEvent } from './pages/SuggestEvent';
import { EventBooking } from './pages/EventBooking';
import { VisitBooking } from './pages/VisitBooking';
import { MyBookings } from './pages/MyBookings';
import { DonationHistory } from './pages/DonationHistory';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { About } from './pages/About';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageNeeds } from './pages/admin/ManageNeeds';
import { ManageEvents } from './pages/admin/ManageEvents';
import { CreateEvent } from './pages/admin/CreateEvent';
import { FeedManagement } from './pages/admin/FeedManagement';
import { Settings as AdminSettings } from './pages/admin/Settings';
import { ManageAshrams } from './pages/admin/ManageAshrams';
import { CreateAshram } from './pages/admin/CreateAshram';
import { EventBookings } from './pages/admin/EventBookings';
import { NotFound } from './pages/NotFound';
import { UserProvider } from './context/UserContext';

// Wrapper component to provide UserContext to all routes
function RootLayout({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout><Layout /></RootLayout>,
    children: [
      { index: true, path: '/', Component: Home },
      { path: 'needs', Component: Needs },
      { path: 'events', Component: Events },
      { path: 'events/suggest', Component: SuggestEvent },
      { path: 'events/book/:id', Component: EventBooking },
      { path: 'visit-book/:ashramId', Component: VisitBooking },
      { path: 'donate/:id', Component: Donation },
      { path: 'donate-flow/:ashramId/:needId', Component: DonationFlow },
      { path: 'profile', Component: Profile },
      { path: 'my-bookings', Component: MyBookings },
      { path: 'donation-history', Component: DonationHistory },
      { path: 'settings', Component: Settings },
      { path: 'help', Component: Help },
      { path: 'about', Component: About },
      { 
        path: 'admin',
        children: [
            { index: true, Component: AdminDashboard },
            { path: 'needs', Component: ManageNeeds },
            { path: 'events', Component: ManageEvents },
            { path: 'events/bookings/:id', Component: EventBookings },
            { path: 'events/create', Component: CreateEvent },
            { path: 'feed', Component: FeedManagement },
            { path: 'settings', Component: AdminSettings },
        ]
      },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/login',
    element: <RootLayout><Login /></RootLayout>,
  },
  {
    path: '/onboarding',
    element: <RootLayout><Onboarding /></RootLayout>,
  },
  {
    path: '/signup',
    element: <RootLayout><Signup /></RootLayout>,
  }
]);