import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Calendar, 
  MapPin,
  Users,
  Clock,
  Eye
} from 'lucide-react';
import { mockEvents } from '../../data/mock';
import { useNavigate } from 'react-router';

export function ManageEvents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // In a real app, filter by logged-in admin's ashramId
  const myEvents = mockEvents.filter(event => event.ashramId === 'ashram-1'); 

  // Mock booking data
  const eventBookings = {
    'event-1': { registered: 24, capacity: 50 },
    'event-2': { registered: 12, capacity: 30 },
    'event-3': { registered: 45, capacity: 100 }
  };

  const filteredEvents = myEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRegistrations = Object.values(eventBookings).reduce((sum, b) => sum + b.registered, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/admin')}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Manage Events</h1>
            <p className="text-xs text-muted-foreground">Schedule and track events</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Input 
            placeholder="Search events..." 
            className="pl-10 bg-muted/50 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{filteredEvents.length}</p>
              <p className="text-xs text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Users className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{totalRegistrations}</p>
              <p className="text-xs text-muted-foreground">Registrations</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Button */}
        <Button 
          className="w-full mb-6 h-12 gap-2"
          onClick={() => navigate('/admin/events/create')}
        >
          <Plus className="h-5 w-5" />
          Create New Event
        </Button>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map(event => {
            const bookingInfo = eventBookings[event.id as keyof typeof eventBookings] || { registered: 0, capacity: 0 };
            const fillPercentage = bookingInfo.capacity > 0 
              ? (bookingInfo.registered / bookingInfo.capacity) * 100 
              : 0;

            return (
              <Card key={event.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-32 flex-shrink-0">
                      <img 
                        src={event.imageUrl} 
                        className="h-full w-full object-cover rounded-l-lg" 
                        alt={event.title} 
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-3 pr-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-sm line-clamp-1 flex-1">{event.title}</h3>
                        <Badge variant="secondary" className="text-[10px] ml-2">
                          {event.date}
                        </Badge>
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>

                      {/* Booking Progress */}
                      {bookingInfo.capacity > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Registrations</span>
                            <span className="font-medium">
                              {bookingInfo.registered}/{bookingInfo.capacity}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${fillPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs flex-1"
                          onClick={() => navigate(`/admin/events/bookings/${event.id}`)}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          View Bookings
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 text-xs px-2"
                          onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 text-xs px-2 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">No events found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
