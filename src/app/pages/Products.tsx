import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ShoppingBag, 
  Package, 
  ArrowLeft,
  Sparkles,
  Bell,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router';

export function Products() {
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
            <h1 className="text-lg font-bold">Products</h1>
            <p className="text-xs text-muted-foreground">Shop & Support</p>
          </div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-full">
              <ShoppingBag className="h-16 w-16 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-serif font-bold">
              Product Catalog
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We're curating an amazing collection of handmade products from local artisans. 
              Every purchase will support orphanages across India.
            </p>
          </div>

          {/* Features Preview */}
          <Card className="p-5 text-left space-y-3">
            <h3 className="font-bold text-sm mb-3">What's Coming:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Curated Products</p>
                  <p className="text-xs text-muted-foreground">Handmade items from local vendors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy Shopping</p>
                  <p className="text-xs text-muted-foreground">Simple cart and checkout process</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Automatic Donations</p>
                  <p className="text-xs text-muted-foreground">15% goes to support children</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Notify Me */}
          <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-bold">Get Notified</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 text-left">
              Be the first to know when we launch the marketplace!
            </p>
            <Button className="w-full gap-2">
              <Mail className="h-4 w-4" />
              Notify Me
            </Button>
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
