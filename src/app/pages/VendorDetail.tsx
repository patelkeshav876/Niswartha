import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Store, 
  Package, 
  ArrowLeft,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Heart
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function VendorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

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
            <h1 className="text-lg font-bold">Vendor Details</h1>
            <p className="text-xs text-muted-foreground">Shop & Support</p>
          </div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 p-8 rounded-full">
              <Store className="h-16 w-16 text-orange-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-primary p-2 rounded-full animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-serif font-bold">
              Vendor Profiles
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Detailed vendor pages with their story, products, and impact. 
              Get to know the artisans behind the products.
            </p>
          </div>

          {/* Features Preview */}
          <Card className="p-5 text-left space-y-3">
            <h3 className="font-bold text-sm mb-3">Coming Features:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-1.5 rounded-lg">
                  <Store className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Vendor Stories</p>
                  <p className="text-xs text-muted-foreground">Learn about local artisans</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-1.5 rounded-lg">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Product Showcase</p>
                  <p className="text-xs text-muted-foreground">Browse their full collection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/10 p-1.5 rounded-lg">
                  <Heart className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Impact Tracking</p>
                  <p className="text-xs text-muted-foreground">See their contribution to ashrams</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200 text-left">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-600" />
              Vendor Information
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each vendor profile will include their location, contact details, product range, and the percentage of sales donated to orphanages.
            </p>
            <div className="flex gap-2 text-xs">
              <Badge variant="secondary" className="gap-1">
                <Phone className="h-3 w-3" />
                Contact
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Mail className="h-3 w-3" />
                Email
              </Badge>
            </div>
          </Card>

          {/* Back Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/earn-support')}
          >
            Back to Marketplace
          </Button>
        </div>
      </main>
    </div>
  );
}
