import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Package, 
  ArrowLeft,
  Sparkles,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function CategoryProducts() {
  const navigate = useNavigate();
  const { category } = useParams();

  const categoryIcons: Record<string, string> = {
    'handicrafts': '🎨',
    'textiles': '🧵',
    'pottery': '🏺',
    'jewelry': '💍',
    'home-decor': '🏠',
    'food-items': '🍯'
  };

  const categoryName = category?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'Products';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-6 py-4">
        <div className="flex items-center justify-between">
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
              <h1 className="text-lg font-bold flex items-center gap-2">
                <span className="text-2xl">{categoryIcons[category || ''] || '🛍️'}</span>
                {categoryName}
              </h1>
              <p className="text-xs text-muted-foreground">Browse products</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 p-8 rounded-full">
              <Package className="h-16 w-16 text-purple-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-serif font-bold">
              {categoryName} Catalog
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We're building a comprehensive catalog of {categoryName.toLowerCase()} from talented artisans. 
              Each product will showcase traditional craftsmanship with modern quality.
            </p>
          </div>

          {/* Features Preview */}
          <Card className="p-5 text-left space-y-3">
            <h3 className="font-bold text-sm mb-3">What to Expect:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-1.5 rounded-lg">
                  <Package className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Curated Selection</p>
                  <p className="text-xs text-muted-foreground">Hand-picked quality products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-1.5 rounded-lg">
                  <Filter className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Smart Filters</p>
                  <p className="text-xs text-muted-foreground">Sort by price, rating, popularity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/10 p-1.5 rounded-lg">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Verified Artisans</p>
                  <p className="text-xs text-muted-foreground">Support local craftspeople</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Category Info */}
          <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 text-left">
            <div className="text-4xl mb-3 text-center">
              {categoryIcons[category || ''] || '🛍️'}
            </div>
            <h3 className="font-bold mb-2 text-center">{categoryName}</h3>
            <p className="text-sm text-muted-foreground text-center">
              Authentic, handcrafted items that celebrate traditional artistry while supporting orphanages.
            </p>
          </Card>

          {/* Back Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/earn-support')}
          >
            Back to All Categories
          </Button>
        </div>
      </main>
    </div>
  );
}
