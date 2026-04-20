import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Heart,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Target,
  Facebook,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockAshrams } from '../data/mock';
import { ScrollReveal } from '../components/ScrollReveal';

export function About() {
  const navigate = useNavigate();
  const ashram = mockAshrams[0];

  const features = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'A structured, inclusive environment from Grades 1 to 12 with modern digital classrooms.'
    },
    {
      icon: Users,
      title: 'Advanced Speech Therapy',
      description: 'Expert special educators and dedicated therapy rooms to enhance communication skills.'
    },
    {
      icon: Briefcase,
      title: 'Career & Life Skills',
      description: 'Mentoring for higher education, competitive exams, and job opportunities post-12th.'
    },
    {
      icon: Award,
      title: 'Holistic Development',
      description: 'Comprehensive sports facilities, modern fitness gear, and yoga for balanced growth.'
    }
  ];

  const milestones = [
    { year: 'Since 1946', title: 'Legacy of Care', description: 'Decades of dedicated educational service' },
    { year: 'Awarded', title: 'National Recognition', description: 'Honored by the Government of India' },
    { year: '100%', title: 'Academic Success', description: 'Consistent perfection in board exams' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">About Us</h1>
            <p className="text-xs text-muted-foreground">Our Story & Mission</p>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-6 space-y-6">
        {/* Hero Image */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img 
            src={ashram.imageUrl}
            alt={ashram.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-1">{ashram.name}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">{ashram.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <ScrollReveal>
        <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To provide every hearing-impaired student with quality education, unwavering confidence, and the practical skills needed for an independent, successful future in a supportive and inclusive environment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </ScrollReveal>

        {/* Our Focus Areas */}
        <ScrollReveal delay={0.05}>
        <div>
          <h3 className="text-xl font-bold mb-4">What We Offer</h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-none shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* Milestones */}
        <ScrollReveal delay={0.08}>
        <div>
          <h3 className="text-xl font-bold mb-4">Our Impact</h3>
          <div className="space-y-3">
            {milestones.map((milestone, idx) => (
              <Card key={idx} className="border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center flex-shrink-0">
                      <Badge className="bg-primary mb-1 text-base px-3 py-1">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1">{milestone.title}</h4>
                      <p className="text-xs text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* Photo Gallery */}
        <ScrollReveal delay={0.06}>
        <div>
          <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
          <div className="grid grid-cols-2 gap-3">
            {ashram.gallery?.map((image, idx) => (
              <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                <img 
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal delay={0.05}>
        <Card className="border-none shadow-md">
          <CardContent className="p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a href={`tel:${ashram.contact.phone}`} className="font-medium text-sm hover:text-primary">
                    {ashram.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${ashram.contact.email}`} className="font-medium text-sm hover:text-primary break-all">
                    {ashram.contact.email}
                  </a>
                </div>
              </div>

              {ashram.contact.website && (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <a href={`https://${ashram.contact.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-sm hover:text-primary">
                      {ashram.contact.website}
                    </a>
                  </div>
                </div>
              )}

              {ashram.facebookUrl && (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Facebook className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Facebook</p>
                    <a
                      href={ashram.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sm hover:text-primary"
                    >
                      Deaf and Dumb Industrial Institute — Nagpur
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium text-sm">{ashram.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
        <Card className="border-none shadow-md bg-gradient-to-br from-primary to-primary/80">
          <CardContent className="p-5 text-center text-white">
            <Heart className="h-12 w-12 mx-auto mb-3 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Support Our Cause</h3>
            <p className="text-sm text-white/90 mb-4 leading-relaxed">
              Your generous contribution helps us provide better care, education, and opportunities to our children.
            </p>
            <Button
              className="w-full bg-white text-primary hover:bg-white/90"
              onClick={() => navigate(`/donate/${ashram.id}`)}
            >
              Donate Now
            </Button>
          </CardContent>
        </Card>
        </ScrollReveal>
      </main>
    </div>
  );
}
