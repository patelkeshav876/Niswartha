import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  ArrowRight,
  Settings,
  History,
  HelpCircle,
  LogOut,
  Heart,
  Calendar,
  Mail,
  Users,
  Activity,
  IndianRupee,
  Clock3,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { api } from '../lib/api';
import { mockAshrams } from '../data/mock';
import type { Donation } from '../types';

export function Profile() {
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    let alive = true;

    const load = async () => {
      try {
        const data = await api.getDonations(currentUser.id);
        if (!alive) return;
        setDonations(data);
        setLastUpdated(new Date());
      } catch {
        if (!alive) return;
        setDonations([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();
    const interval = window.setInterval(load, 30000);
    return () => {
      alive = false;
      window.clearInterval(interval);
    };
  }, [currentUser]);

  const stats = useMemo(() => {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const uniqueAshrams = new Set(donations.map((d) => d.ashramId)).size;
    return {
      totalDonations,
      donationCount: donations.length,
      livesImpacted: Math.max(0, Math.floor(totalDonations / 250)),
      ashramSupported: uniqueAshrams,
      recent: [...donations]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    };
  }, [donations]);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="bg-[#0d130f] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.14),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.1),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:22px_22px] opacity-25" />

        <div className="relative p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-white/20">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-white/10 text-white font-bold">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-white/70">Welcome back</p>
                <h1 className="font-semibold text-lg leading-tight">{currentUser.name}</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {!isAdmin && (
            <Card className="bg-[#c5e54d] text-zinc-900 border-0 shadow-2xl rounded-3xl">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium opacity-80">Total Donation Balance</p>
                  <Badge className="bg-zinc-900 text-white border-0">LIVE</Badge>
                </div>
                <div className="mt-1 flex items-end gap-1">
                  <IndianRupee className="h-6 w-6" />
                  <p className="text-4xl font-bold tracking-tight">
                    {loading ? '...' : stats.totalDonations.toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs opacity-80">
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>
                    Updated {lastUpdated ? lastUpdated.toLocaleTimeString() : 'just now'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-4">
                  <button
                    type="button"
                    className="bg-zinc-900 text-white rounded-xl py-2 text-[11px] font-medium"
                    onClick={() => navigate('/donation-history')}
                  >
                    History
                  </button>
                  <button
                    type="button"
                    className="bg-zinc-900 text-white rounded-xl py-2 text-[11px] font-medium"
                    onClick={() => navigate('/needs')}
                  >
                    Needs
                  </button>
                  <button
                    type="button"
                    className="bg-zinc-900 text-white rounded-xl py-2 text-[11px] font-medium"
                    onClick={() => navigate('/events')}
                  >
                    Events
                  </button>
                  <button
                    type="button"
                    className="bg-zinc-900 text-white rounded-xl py-2 text-[11px] font-medium"
                    onClick={() => navigate('/favorites')}
                  >
                    Saved
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <main className="flex-1 p-5 space-y-4">
        {!isAdmin && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs">Donations</span>
                </div>
                <p className="text-2xl font-bold">{loading ? '...' : stats.donationCount}</p>
              </Card>
              <Card className="p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Lives Impacted</span>
                </div>
                <p className="text-2xl font-bold">{loading ? '...' : `${stats.livesImpacted}+`}</p>
              </Card>
            </div>

            <Card className="p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Recent Live Donations</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0" onClick={() => navigate('/donation-history')}>
                  View all <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
              <div className="space-y-2">
                {stats.recent.length === 0 && !loading ? (
                  <p className="text-xs text-muted-foreground">No donations yet. Start by supporting a need.</p>
                ) : (
                  stats.recent.map((d) => {
                    const ashram = mockAshrams.find((a) => a.id === d.ashramId);
                    return (
                      <div key={d.id} className="rounded-xl bg-muted/50 px-3 py-2 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium">{ashram?.name || 'Ashram'}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {new Date(d.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">₹{d.amount.toLocaleString()}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </>
        )}

        {isAdmin && (
          <Card
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50"
            onClick={() => navigate('/admin')}
          >
            <div>
              <p className="text-sm font-semibold">Admin Dashboard</p>
              <p className="text-xs text-muted-foreground">Manage ashram and activities</p>
            </div>
            <ArrowRight className="h-4 w-4" />
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3">
          {!isAdmin && (
            <>
              <Card
                className="p-3 cursor-pointer hover:bg-muted/50"
                onClick={() => navigate('/my-bookings')}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">My Bookings</span>
                </div>
              </Card>
              <Card
                className="p-3 cursor-pointer hover:bg-muted/50"
                onClick={() => navigate('/favorites')}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-medium">Favorites</span>
                </div>
              </Card>
            </>
          )}
          <Card className="p-3 cursor-pointer hover:bg-muted/50" onClick={() => navigate('/help')}>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium">Help & Support</span>
            </div>
          </Card>
          <Card className="p-3 cursor-pointer hover:bg-muted/50" onClick={() => navigate('/settings')}>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-zinc-600" />
              <span className="text-xs font-medium">Settings</span>
            </div>
          </Card>
        </div>

        <Card className="p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="text-xs">{currentUser.email}</span>
          </div>
          {!isAdmin && (
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">
                Supporting {stats.ashramSupported} ashram{stats.ashramSupported === 1 ? '' : 's'}
              </span>
            </div>
          )}
        </Card>

        <Button variant="destructive" className="w-full gap-2 h-12" onClick={() => navigate('/login')}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </main>
    </div>
  );
}