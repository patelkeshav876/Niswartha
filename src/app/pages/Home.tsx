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
  Calendar,
  TrendingUp,
  Facebook,
} from 'lucide-react';
import { mockAshrams, mockNeeds, mockEvents } from '../data/mock';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { api } from '../lib/api';
import { Ashram, type Event as EventType, Need } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';
import { FloatingQuickContact } from '../components/FloatingQuickContact';
import { PremiumHeroBackdrop } from '../components/home/PremiumHeroBackdrop';
import { HomeAshramIntro } from '../components/home/HomeAshramIntro';
import { HomeQuickActionTile } from '../components/home/HomeQuickActionTile';
import { HomeSoftCard } from '../components/home/HomeSoftCard';

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
      if (eventsData && Array.isArray(eventsData)) {
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

  const urgentNeeds = needs.filter((n) => n.urgency === 'high');
  const mainRef = useRef<HTMLElement | null>(null);

  const heroImage =
    ashram.imageUrl ||
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80';
  const galleryThumbs = ashram.gallery?.slice(0, 3) ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <PremiumHeroBackdrop>
        <HomeAshramIntro
          ashram={ashram}
          currentUser={currentUser}
          heroImage={heroImage}
          galleryThumbs={galleryThumbs}
          needsCount={needs.length}
          urgentNeedsCount={urgentNeeds.length}
          getFirstName={getFirstName}
          onExplore={() =>
            mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        />
      </PremiumHeroBackdrop>

      <main ref={mainRef} className="flex-1 space-y-6 px-4 py-6">
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <HomeQuickActionTile
              tint="primary"
              title="Donate Now"
              subtitle="Support our children"
              icon={<Heart className="h-5 w-5 sm:h-6 sm:w-6" />}
              onClick={() => navigate(`/donate/${ashram.id}`)}
            />
            <HomeQuickActionTile
              tint="blue"
              title="About Us"
              subtitle="Our story & mission"
              icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />}
              onClick={() => navigate('/about')}
            />
            <HomeQuickActionTile
              tint="orange"
              title="Visit Us"
              subtitle="Book your visit"
              icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />}
              onClick={() => navigate(`/visit-book/${ashram.id}`)}
            />
          </div>
        </ScrollReveal>

        {urgentNeeds.length > 0 && (
          <ScrollReveal delay={0.08}>
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Urgent Needs
                  </h2>
                  <p className="text-xs text-muted-foreground">Help us reach our goals</p>
                </div>
                <Link to="/needs">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {urgentNeeds.slice(0, 3).map((need, i) => (
                  <motion.div
                    key={need.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <HomeSoftCard
                      onClick={() => navigate(`/donate-flow/${need.ashramId}/${need.id}`)}
                    >
                      <div className="flex gap-4">
                        <img
                          src={need.imageUrl}
                          alt={need.title}
                          className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-inner ring-1 ring-black/5"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="line-clamp-1 text-sm font-bold">{need.title}</h3>
                            <Badge variant="destructive" className="ml-2 text-[10px]">
                              Urgent
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="mb-2 text-[10px]">
                            {need.category}
                          </Badge>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                ₹{need.quantityFulfilled.toLocaleString()} / ₹
                                {need.quantityRequired.toLocaleString()}
                              </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary shadow-inner">
                              <div
                                className="h-full rounded-full bg-primary shadow-sm transition-all"
                                style={{
                                  width: `${(need.quantityFulfilled / need.quantityRequired) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </HomeSoftCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.06}>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Upcoming Events
                </h2>
                <p className="text-xs text-muted-foreground">Join us and make memories</p>
              </div>
              <Link to="/events">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                >
                  <HomeSoftCard onClick={() => navigate('/events')}>
                    <div className="flex gap-4">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-inner ring-1 ring-black/5"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 line-clamp-1 text-sm font-bold">{event.title}</h3>
                        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </HomeSoftCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-primary/[0.07] via-card to-primary/[0.04] shadow-[0_16px_48px_-20px_rgba(15,109,78,0.2),0_8px_24px_-12px_rgba(15,23,42,0.08)] ring-1 ring-primary/10">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-bold tracking-tight">Get in Touch</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-3 py-2.5 shadow-inner ring-1 ring-border/40">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`tel:${ashram.contact.phone}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {ashram.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-3 py-2.5 shadow-inner ring-1 ring-border/40">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`mailto:${ashram.contact.email}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {ashram.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-3 py-2.5 shadow-inner ring-1 ring-border/40">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{ashram.location}</span>
                </div>
                {ashram.facebookUrl ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-background/60 px-3 py-2.5 shadow-inner ring-1 ring-border/40">
                    <Facebook className="h-4 w-4 shrink-0 text-primary" />
                    <a
                      href={ashram.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
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
