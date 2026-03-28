import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  User,
  AlertCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { mockEvents } from '../data/mock';
import { useUser } from '../context/UserContext';
import { api } from '../lib/api';
import { motion } from 'motion/react';

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  total: number;
}

export function EventBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useUser();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [numGuests, setNumGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    specialRequests: ''
  });

  const event = mockEvents.find(e => e.id === id);

  // Available time slots (9 AM to 5 PM, 1-hour intervals)
  const timeSlots: TimeSlot[] = [
    { id: 'slot-1', time: '09:00 AM - 10:00 AM', available: 8, total: 10 },
    { id: 'slot-2', time: '10:00 AM - 11:00 AM', available: 10, total: 10 },
    { id: 'slot-3', time: '11:00 AM - 12:00 PM', available: 6, total: 10 },
    { id: 'slot-4', time: '12:00 PM - 01:00 PM', available: 0, total: 10 },
    { id: 'slot-5', time: '02:00 PM - 03:00 PM', available: 9, total: 10 },
    { id: 'slot-6', time: '03:00 PM - 04:00 PM', available: 7, total: 10 },
    { id: 'slot-7', time: '04:00 PM - 05:00 PM', available: 10, total: 10 },
  ];

  useEffect(() => {
    if (event) {
      // Set default date to event date
      setSelectedDate(event.date);
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    setIsSubmitting(true);

    try {
      const slot = timeSlots.find((s) => s.id === selectedSlot);
      const bookingData = {
        eventId: id,
        userId: currentUser?.id,
        date: selectedDate,
        timeSlot: selectedSlot,
        time: slot?.time ?? '',
        guests: numGuests,
        ...formData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Save to backend
      await api.createEventBooking(bookingData);
      
      setBookingSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  if (bookingSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground text-center mb-6">
          Your visit has been scheduled successfully.<br />
          Check your email for confirmation details.
        </p>
        <Button onClick={() => navigate('/events')}>
          Back to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/events')}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Book Your Visit</h1>
            <p className="text-xs text-muted-foreground">Select date and time slot</p>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          {/* Event Info Card */}
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <img 
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h2 className="font-bold mb-2">{event.title}</h2>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <Label className="text-sm font-bold mb-3 block flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Select Date
              </Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Time Slot Selection */}
          {selectedDate && (
            <Card className="border-none shadow-sm">
              <CardContent className="p-5">
                <Label className="text-sm font-bold mb-3 block flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Select Time Slot
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((slot) => {
                    const isBooked = slot.available === 0;
                    const isSelected = selectedSlot === slot.id;
                    
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`
                          p-4 rounded-lg border-2 text-left transition-all
                          ${isBooked 
                            ? 'bg-muted/50 border-muted cursor-not-allowed opacity-50' 
                            : isSelected 
                              ? 'bg-primary/10 border-primary' 
                              : 'bg-background border-border hover:border-primary/50'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Clock className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                            <div>
                              <p className={`font-medium text-sm ${isSelected ? 'text-primary' : ''}`}>
                                {slot.time}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {isBooked 
                                  ? 'Fully Booked' 
                                  : `${slot.available} slots available`
                                }
                              </p>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {!selectedSlot && (
                  <div className="mt-3 flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-700">
                      Please select a time slot to continue
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Number of Guests */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <Label className="text-sm font-bold mb-3 block flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Number of Guests
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold">{numGuests}</span>
                  <p className="text-xs text-muted-foreground">
                    {numGuests === 1 ? 'Guest' : 'Guests'}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setNumGuests(Math.min(10, numGuests + 1))}
                  className="h-10 w-10"
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Your Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests" className="text-sm">Special Requests (Optional)</Label>
                <Textarea
                  id="requests"
                  placeholder="Any special requirements or questions..."
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          {selectedSlot && (
            <Card className="border-none shadow-md bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-5">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Booking Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event</span>
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">
                      {timeSlots.find(s => s.id === selectedSlot)?.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-medium">{numGuests}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 gap-2"
            disabled={!selectedSlot || isSubmitting}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By confirming, you agree to receive confirmation via email and SMS
          </p>
        </form>
      </main>
    </div>
  );
}
