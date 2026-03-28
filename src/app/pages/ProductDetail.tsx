import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Package, 
  ShoppingCart, 
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  Truck,
  Shield
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function ProductDetail() {
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
            <h1 className="text-lg font-bold">Product Details</h1>
            <p className="text-xs text-muted-foreground">Shop & Support</p>
          </div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-8 rounded-full">
              <Package className="h-16 w-16 text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-serif font-bold">
              Product Details
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Detailed product pages with high-quality images, descriptions, pricing, 
              and information about the artisan who made it.
            </p>
          </div>

          {/* Features Preview */}
          <Card className="p-5 text-left space-y-3">
            <h3 className="font-bold text-sm mb-3">What You'll See:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/10 p-1.5 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Product Gallery</p>
                  <p className="text-xs text-muted-foreground">Multiple high-quality images</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/10 p-1.5 rounded-lg">
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Reviews & Ratings</p>
                  <p className="text-xs text-muted-foreground">Real customer feedback</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/10 p-1.5 rounded-lg">
                  <Heart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Impact Information</p>
                  <p className="text-xs text-muted-foreground">See how your purchase helps</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Benefits Card */}
          <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 text-left">
            <h3 className="font-bold mb-3">Shopping Benefits</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Free shipping on orders above ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Secure payment & buyer protection</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-blue-600" />
                <span>15% donation to orphanages included</span>
              </div>
            </div>
          </Card>

          {/* Mock Add to Cart */}
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="text-2xl font-bold">₹499</p>
              </div>
              <Button className="gap-2" disabled>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-left">
              * Product catalog launching soon
            </p>
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
