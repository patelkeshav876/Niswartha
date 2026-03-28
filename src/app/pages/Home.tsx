import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Users,
  Gift,
  Calendar,
  TrendingUp,
  Sparkles,
  ShoppingBag,
  Facebook,
} from 'lucide-react';
import { mockAshrams, mockNeeds, mockEvents } from '../data/mock';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { api } from '../lib/api';
import { addNeedToCart } from '../lib/donationCart';
import {
  Ashram,
  type Event as EventType,
  Need,
} from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { FloatingQuickContact } from '../components/FloatingQuickContact';

export function Home() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [ashram, setAshram] = useState<Ashram>(mockAshrams[0]);
  const [needs, setNeeds] = useState<Need[]>(mockNeeds);
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>(() =>
    mockEvents.slice(0, 3),
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [needsData, ashramsData, eventsData] = await Promise.all([
        api.getNeeds(),
        api.getAshrams(),
        api.getEvents(),
      ]);
      if (needsData.length > 0) setNeeds(needsData);
      if (ashramsData.length > 0) setAshram(ashramsData[0]);
      if (eventsData.length > 0) {
        const sorted = [...eventsData].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        setUpcomingEvents(sorted.slice(0, 3));
      }
    } catch {
      // Keep mock data
    }
  };

  const getFirstName = (name: string) => name.split(' ')[0];

  // Calculate stats
  const urgentNeeds = needs.filter(n => n.urgency === 'high');
  const mainRef = useRef<HTMLElement | null>(null);

  const heroImage =
    ashram.imageUrl ||
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80';
  const galleryThumbs = ashram.gallery?.slice(0, 3) ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Hero — splash-style: dark canvas + image-led card (mobile-first) */}
      <div className="relative overflow-hidden bg-[#0a0a0c] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,255,255,0.07),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(163,230,53,0.06),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#121214_0%,#0a0a0c_40%,#050506_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-35" />

        <motion.div
          aria-hidden
          className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-lime-400/10 blur-3xl"
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative px-4 pt-8 pb-8 max-w-[480px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/45 mb-5"
          >
            Orphanage Connect
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative overflow-hidden rounded-[28px] bg-zinc-900 shadow-[0_40px_100px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.08]"
          >
            <div className="relative aspect-[16/11] max-h-[min(52vw,240px)] w-full shrink-0 overflow-hidden sm:max-h-[260px]">
              <img
                src={heroImage}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
              <div className="absolute left-3 top-3 right-3 flex items-start justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md ring-1 ring-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  Verified NGO
                </div>
                <Link
                  to="/profile"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/40 text-sm font-bold text-white backdrop-blur-md ring-1 ring-white/20 transition-transform active:scale-95"
                >
                  {currentUser ? currentUser.name.charAt(0) : 'G'}
                </Link>
              </div>
            </div>

            <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-black px-5 pb-5 pt-4">
              <p className="text-[13px] text-white/55">
                Namaste,{' '}
                <span className="font-medium text-white/90">
                  {currentUser ? getFirstName(currentUser.name) : 'Guest'}
                </span>
              </p>
              <p className="text-[11px] text-white/40 mb-3">Welcome to our family</p>

              <div className="mb-3 flex -space-x-2">
                {(galleryThumbs.length > 0
                  ? galleryThumbs
                  : [heroImage, heroImage, heroImage]
                ).map((url, i) => (
                  <div
                    key={`${url}-${i}`}
                    className="h-9 w-9 rounded-full border-2 border-zinc-900 ring-1 ring-white/15 overflow-hidden bg-white/10"
                  >
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>

              <h1 className="font-serif text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-2xl">
                {ashram.name}
              </h1>
              <div className="mt-2 flex items-start gap-2 text-[13px] text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-300/80" />
                <span className="leading-snug">{ashram.location}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/45 line-clamp-3">
                {ashram.description}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white/[0.07] px-2 py-3 text-center ring-1 ring-white/10">
                  <Users className="mx-auto mb-1 h-4 w-4 text-lime-200/90" />
                  <p className="text-lg font-bold text-white">50+</p>
                  <p className="text-[10px] text-white/55">Children</p>
                </div>
                <div className="rounded-2xl bg-white/[0.07] px-2 py-3 text-center ring-1 ring-white/10">
                  <Gift className="mx-auto mb-1 h-4 w-4 text-white/80" />
                  <p className="text-lg font-bold text-white">{needs.length}</p>
                  <p className="text-[10px] text-white/55">Needs</p>
                </div>
                <div className="rounded-2xl bg-white/[0.07] px-2 py-3 text-center ring-1 ring-white/10">
                  <Heart className="mx-auto mb-1 h-4 w-4 text-rose-300/80" />
                  <p className="text-lg font-bold text-white">₹1.2L</p>
                  <p className="text-[10px] text-white/55">This mo.</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-white/45">
                  {urgentNeeds.length} urgent need{urgentNeeds.length === 1 ? '' : 's'} right now
                </p>
                <Button
                  type="button"
                  className="h-11 w-full rounded-full bg-white text-[14px] font-semibold text-black shadow-[0_12px_32px_rgba(255,255,255,0.12)] hover:bg-white/95 sm:w-auto sm:min-w-[140px] sm:shrink-0"
                  onClick={() => {
                    mainRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <ScrollReveal>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
            onClick={() => navigate(`/donate/${ashram.id}`)}
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">Donate Now</h3>
              <p className="text-xs text-muted-foreground">Support our children</p>
            </CardContent>
          </Card>

          <Card 
            className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
            onClick={() => navigate('/about')}
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-1">About Us</h3>
              <p className="text-xs text-muted-foreground">Our story & mission</p>
            </CardContent>
          </Card>
        </div>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/events')}
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-bold mb-1">Visit Us</h3>
              <p className="text-xs text-muted-foreground">Book your visit</p>
            </CardContent>
          </Card>

          <Card 
            className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/earn-support')}
          >
            <CardContent className="p-5 flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-1">Shop</h3>
              <p className="text-xs text-muted-foreground">Support & earn</p>
            </CardContent>
          </Card>
        </div>
        </ScrollReveal>

        {/* Urgent Needs */}
        {urgentNeeds.length > 0 && (
          <ScrollReveal delay={0.08}>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Urgent Needs
                </h2>
                <p className="text-xs text-muted-foreground">Help us reach our goals</p>
              </div>
              <Link to="/needs">
                <Button variant="ghost" size="sm" className="text-primary h-auto p-0">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {urgentNeeds.slice(0, 3).map((need, i) => (
                <motion.div
                  key={need.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                >
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
                    onClick={() => {
                      addNeedToCart(need);
                      navigate(`/donate/${need.ashramId}?need=${need.id}`);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={need.imageUrl} 
                          alt={need.title}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-sm line-clamp-1">{need.title}</h3>
                            <Badge variant="destructive" className="text-[10px] ml-2">
                              Urgent
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="text-[10px] mb-2">
                            {need.category}
                          </Badge>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                ₹{need.quantityFulfilled.toLocaleString()} / ₹{need.quantityRequired.toLocaleString()}
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${(need.quantityFulfilled / need.quantityRequired) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        )}

        {/* Upcoming Events */}
        <ScrollReveal delay={0.06}>
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Upcoming Events
              </h2>
              <p className="text-xs text-muted-foreground">Join us and make memories</p>
            </div>
            <Link to="/events">
              <Button variant="ghost" size="sm" className="text-primary h-auto p-0">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]"
                  onClick={() => navigate('/events')}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm mb-1 line-clamp-1">{event.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* Marketplace CTA */}
        <ScrollReveal>
        <Card className="border-none shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">Shop & Support</h3>
                  <Badge className="bg-orange-600 hover:bg-orange-700 text-[10px]">
                    <Sparkles className="h-3 w-3 mr-1" />
                    New
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse handmade products from local vendors. 15% of every sale supports our children!
                </p>
                <Button 
                  size="sm" 
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => navigate('/earn-support')}
                >
                  Explore Marketplace
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal delay={0.05}>
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-5">
            <h3 className="font-bold mb-3">Get in Touch</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${ashram.contact.phone}`} className="text-muted-foreground hover:text-primary">
                  {ashram.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${ashram.contact.email}`} className="text-muted-foreground hover:text-primary">
                  {ashram.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{ashram.location}</span>
              </div>
              {ashram.facebookUrl ? (
                <div className="flex items-center gap-3 text-sm">
                  <Facebook className="h-4 w-4 text-primary" />
                  <a
                    href={ashram.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary">
                    Follow us on Facebook
                  </a>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
        </ScrollReveal>
      </main>
      <FloatingQuickContact ashram={ashram} />
    </div>
  );
}