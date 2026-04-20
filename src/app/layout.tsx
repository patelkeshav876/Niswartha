import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { useUser } from './context/UserContext';
import { cn } from './lib/utils';
import { Toaster } from 'sonner';

export function Layout() {
  const location = useLocation();
  const { loading } = useUser();
  const [continued, setContinued] = useState(false);
  const hideBottomNav = ['/login', '/onboarding', '/donate', '/admin', '/visit-book', '/events/book', '/events/suggest'].some((path) =>
    location.pathname.startsWith(path)
  );

  // Keep the splash visible until the user clicks "Continue".
  if (loading || !continued) {
    return <SplashScreen onFinish={() => setContinued(true)} />;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[480px] bg-background min-h-screen relative shadow-2xl flex flex-col">
        <main className={cn("flex-1 overflow-y-auto", !hideBottomNav && "pb-16")}>
          <Outlet />
        </main>
        <Toaster position="top-center" expand={true} richColors closeButton />
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
}