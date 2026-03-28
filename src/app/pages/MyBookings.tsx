import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  Mail,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { api } from '../lib/api';
import { mockEvents } from '../data/mock';

export function MyBookings() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [currentUser?.id]);

  const loadBookings = async () => {
    try {
      const bookingsData = await api.getEventBookings({
        userId: currentUser?.id,
      });
      setBookings(bookingsData);
    } catch (error) {
      // Fallback to mock data
      setBookings([
        {
          id: '1',
          eventId: 'event-1',
          date: '2024-04-15',
          timeSlot: 'slot-2',
          time: '10:00 AM - 11:00 AM',
          guests: 2,
          name: currentUser?.name || 'Guest User',
          email: currentUser?.email || 'guest@example.com',
          phone: '+91 9876543210',
          status: 'confirmed',
          createdAt: '2024-03-15T10:30:00'
        },
        {
          id: '2',
          eventId: 'event-2',
          date: '2024-04-20',
          timeSlot: 'slot-5',
          time: '02:00 PM - 03:00 PM',
          guests: 3,
          name: currentUser?.name || 'Guest User',
          email: currentUser?.email || 'guest@example.com',
          phone: '+91 9876543210',
          status: 'pending',
          createdAt: '2024-03-18T14:20:00'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getEventDetails = (eventId: string) => {
    return mockEvents.find(e => e.id === eventId);
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.deleteEventBooking(bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/profile')}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">My Bookings</h1>
            <p className="text-xs text-muted-foreground">Your scheduled visits</p>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{bookings.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">No bookings yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Book a visit to see it here
            </p>
            <Button onClick={() => navigate('/events')}>
              Browse Events
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const event = getEventDetails(booking.eventId);
              if (!event) return null;

              return (
                <Card key={booking.id} className="border-none shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      {/* Event Image */}
                      <div className="w-24 h-32 flex-shrink-0">
                        <img 
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 py-3 pr-3">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-sm line-clamp-1 flex-1">
                            {event.title}
                          </h3>
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            className="text-[10px] ml-2"
                          >
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{booking.time || booking.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-muted/50 rounded p-2 mb-3">
                          <div className="flex items-center gap-2 text-xs mb-1">
                            <Mail className="h-3 w-3 text-primary" />
                            <span className="truncate">{booking.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Phone className="h-3 w-3 text-primary" />
                            <span>{booking.phone}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        {booking.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full h-7 text-xs text-destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Cancel Booking
                          </Button>
                        )}
                        {booking.status === 'pending' && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-2">
                            <p className="text-xs text-orange-700">
                              Waiting for confirmation from admin
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
