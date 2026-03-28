import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockEvents } from '../data/mock';
import { useNavigate } from 'react-router';
import { Search, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { api } from '../lib/api';
import type { Event as EventItem } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';

export function Events() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [list, setList] = useState<EventItem[]>(mockEvents);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getEvents();
        if (data.length > 0) setList(data);
      } catch {
        /* mock */
      }
    })();
  }, []);

  const events = list.filter(event => {
    return event.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <h1 className="text-2xl font-serif font-bold text-primary mb-4">Upcoming Events</h1>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search events..." 
            className="pl-9 bg-muted/50 border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Fundraiser', 'Community', 'Workshop'].map(cat => (
            <Badge
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {events.map(event => (
          <ScrollReveal key={event.id}>
          <Card className="overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full">
              <img 
                src={event.imageUrl || 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80'} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 rounded-md text-center shadow-sm">
                <span className="block text-xs font-bold uppercase text-primary">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="block text-xl font-bold text-foreground leading-none">{new Date(event.date).getDate()}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {event.description}
              </p>
              <Button 
                className="w-full group" 
                onClick={() => navigate(`/events/book/${event.id}`)}
              >
                Register / Join
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
          </ScrollReveal>
        ))}
         {events.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
                <p>No events found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}