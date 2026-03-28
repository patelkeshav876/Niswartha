import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Store, 
  ArrowLeft,
  Sparkles,
  Users,
  TrendingUp,
  Heart,
  CheckCircle2,
  FileText,
  Camera,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router';

export function VendorRegistration() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
            <h1 className="text-lg font-bold">Vendor Registration</h1>
            <p className="text-xs text-muted-foreground">Join our marketplace</p>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 pb-24">
        <div className="max-w-md mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-full">
                <Store className="h-16 w-16 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-pulse">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Applications Opening Soon
            </Badge>
            <h2 className="text-2xl font-serif font-bold">
              Become a Vendor
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Join our platform to sell your products while making a difference. 
              Every sale contributes to supporting orphanages.
            </p>
          </div>

          {/* Benefits */}
          <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Why Join Us?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary p-1.5 rounded-full mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Reach More Customers</p>
                  <p className="text-xs text-muted-foreground">Connect with conscious buyers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary p-1.5 rounded-full mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Make an Impact</p>
                  <p className="text-xs text-muted-foreground">Support children with every sale</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary p-1.5 rounded-full mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy Management</p>
                  <p className="text-xs text-muted-foreground">Simple dashboard for your products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary p-1.5 rounded-full mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">No Hidden Fees</p>
                  <p className="text-xs text-muted-foreground">Transparent pricing and payouts</p>
                </div>
              </div>
            </div>
          </Card>

          {/* How It Works */}
          <Card className="p-5">
            <h3 className="font-bold mb-4">Registration Process</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Submit Application</p>
                  <p className="text-xs text-muted-foreground">Fill out vendor registration form with business details</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Verification</p>
                  <p className="text-xs text-muted-foreground">Our team reviews your application (2-3 business days)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Setup Your Store</p>
                  <p className="text-xs text-muted-foreground">Upload products and start selling immediately</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Requirements */}
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              What You'll Need
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                <span>Business registration documents</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-orange-600" />
                <span>Product photos (high quality)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span>Business address verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span>Contact information</span>
              </div>
            </div>
          </Card>

          {/* Donation Info */}
          <Card className="p-5 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500/10 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Donation Structure</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  We add a 10-15% donation fee to product prices, which goes directly to supporting orphanages. 
                  This is clearly displayed to customers and doesn't affect your earnings.
                </p>
                <Badge variant="secondary" className="text-xs">
                  100% transparent pricing
                </Badge>
              </div>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Button className="w-full h-12 text-base gap-2" disabled>
              <Store className="h-5 w-5" />
              Register as Vendor
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Registration portal launching soon. We'll notify all interested vendors.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/earn-support')}
            >
              Back to Marketplace
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
