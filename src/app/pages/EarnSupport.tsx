import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ShoppingBag, 
  Store, 
  Package, 
  Grid3x3, 
  Heart,
  ArrowRight,
  TrendingUp,
  Users,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Vendor, ProductCategory } from '../types';

const img1 =
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=600';
const img2 =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600';

export function EarnSupport() {
  const navigate = useNavigate();
  
  // Mock data - replace with API calls later
  const stats = {
    vendors: 12,
    products: 48,
    categories: 6
  };

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Traditional Handicrafts',
      description: 'Handmade pottery and traditional crafts',
      imageUrl: img1,
      location: 'Varanasi, UP',
      productsCount: 15,
      email: 'contact@traditional-handicrafts.com',
      phone: '+91 9876543210',
      donationPercentage: 15,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Handloom Textiles',
      description: 'Beautiful handwoven fabrics and garments',
      imageUrl: img2,
      location: 'Chanderi, MP',
      productsCount: 22,
      email: 'info@handloom-textiles.com',
      phone: '+91 9876543211',
      donationPercentage: 12,
      createdAt: new Date().toISOString()
    }
  ];

  const categories = [
    { name: 'Handicrafts', icon: '🎨', count: 15 },
    { name: 'Textiles', icon: '🧵', count: 18 },
    { name: 'Pottery', icon: '🏺', count: 8 },
    { name: 'Jewelry', icon: '💍', count: 12 },
    { name: 'Home Decor', icon: '🏠', count: 10 },
    { name: 'Food Items', icon: '🍯', count: 5 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 pb-12">
        <div className="max-w-screen-sm mx-auto">
          <Badge className="bg-white/20 text-white border-white/30 mb-3">
            Earn & Support
          </Badge>
          <h1 className="text-3xl font-serif font-bold mb-3 leading-tight">
            Shop to Support<br />Our Children
          </h1>
          <p className="text-white/90 text-sm mb-6">
            Buy from local vendors, and a percentage automatically goes to support our ashram.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Store className="h-6 w-6 mx-auto mb-2 text-white" />
              <p className="text-2xl font-bold">{stats.vendors}</p>
              <p className="text-xs text-white/80">Vendors</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Package className="h-6 w-6 mx-auto mb-2 text-white" />
              <p className="text-2xl font-bold">{stats.products}</p>
              <p className="text-xs text-white/80">Products</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
              <Grid3x3 className="h-6 w-6 mx-auto mb-2 text-white" />
              <p className="text-2xl font-bold">{stats.categories}</p>
              <p className="text-xs text-white/80">Categories</p>
            </Card>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 space-y-6 max-w-screen-sm mx-auto w-full">
        {/* How It Works */}
        <Card className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">How It Works</h3>
              <p className="text-sm text-muted-foreground">
                Every purchase includes a 10-15% contribution that goes directly to supporting orphanages. Shop with purpose!
              </p>
            </div>
          </div>
          
          <div className="space-y-3 ml-11">
            <div className="flex items-start gap-2">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
              <p className="text-sm">Browse products from local artisans and vendors</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
              <p className="text-sm">Add items to cart and complete your purchase</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
              <p className="text-sm">Automatic donation percentage supports ashrams</p>
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category, idx) => (
              <Card 
                key={idx}
                className="p-4 text-center cursor-pointer hover:bg-muted/50 active:scale-95 transition-transform"
                onClick={() => navigate('/products')}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="text-xs font-medium mb-1">{category.name}</p>
                <p className="text-[10px] text-muted-foreground">{category.count} items</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Vendors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Featured Vendors</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary h-auto p-0"
              onClick={() => navigate('/products')}
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <Card 
                key={vendor.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/vendor/${vendor.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={vendor.imageUrl} 
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 py-3 pr-3">
                    <h3 className="font-bold text-sm mb-1">{vendor.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {vendor.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Package className="h-3 w-3" />
                        <span>{vendor.productsCount} products</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        15% goes to support
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA for Vendors */}
        <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Are you a vendor?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join our marketplace and contribute to a great cause while growing your business.
              </p>
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => navigate('/vendor-registration')}
              >
                Register as Vendor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs">Grow Your Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-xs">Give Back</span>
            </div>
          </div>
        </Card>

        {/* Start Shopping Button */}
        <Button 
          className="w-full h-12 text-base gap-2"
          onClick={() => navigate('/products')}
        >
          <ShoppingBag className="h-5 w-5" />
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Button>
      </main>
    </div>
  );
}