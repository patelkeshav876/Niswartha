import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ShoppingCart, 
  Package, 
  ArrowLeft,
  Sparkles,
  CreditCard,
  Heart,
  Gift,
  ShoppingBag
} from 'lucide-react';
import { useNavigate } from 'react-router';

export function Cart() {
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
            <h1 className="text-lg font-bold">Shopping Cart</h1>
            <p className="text-xs text-muted-foreground">Your items</p>
          </div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          {/* Icon */}
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 p-8 rounded-full">
              <ShoppingCart className="h-16 w-16 text-green-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              Coming Soon
            </Badge>
            <h2 className="text-2xl font-serif font-bold">
              Shopping Cart
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A seamless shopping cart experience with secure checkout. 
              Add multiple items and complete your purchase in minutes.
            </p>
          </div>

          {/* Features Preview */}
          <Card className="p-5 text-left space-y-3">
            <h3 className="font-bold text-sm mb-3">Cart Features:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-1.5 rounded-lg">
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy Management</p>
                  <p className="text-xs text-muted-foreground">Add, remove, or update quantities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-1.5 rounded-lg">
                  <CreditCard className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">Multiple payment options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-500/10 p-1.5 rounded-lg">
                  <Heart className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Auto Donation</p>
                  <p className="text-xs text-muted-foreground">See donation amount at checkout</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Mock Cart Summary */}
          <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <h3 className="font-bold mb-4 text-left">Order Summary Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹1,499</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  Donation (15%)
                </span>
                <span className="font-medium">₹225</span>
              </div>
              <div className="pt-2 border-t flex justify-between text-base font-bold">
                <span>Total</span>
                <span>₹1,724</span>
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-4 text-left">
            <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment Options
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">UPI</Badge>
              <Badge variant="outline" className="text-xs">Cards</Badge>
              <Badge variant="outline" className="text-xs">Net Banking</Badge>
              <Badge variant="outline" className="text-xs">Wallets</Badge>
            </div>
          </Card>

          {/* Mock Checkout Button */}
          <Button className="w-full h-12 text-base gap-2" disabled>
            <CreditCard className="h-5 w-5" />
            Proceed to Checkout
          </Button>

          {/* Back Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/earn-support')}
          >
            Continue Shopping
          </Button>
        </div>
      </main>
    </div>
  );
}
