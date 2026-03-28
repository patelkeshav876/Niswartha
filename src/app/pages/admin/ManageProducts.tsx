import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  ArrowLeft, 
  Plus, 
  Package,
  Store,
  Edit,
  Trash2,
  Search,
  Eye,
  IndianRupee,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router';

const img1 =
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=600';

export function ManageProducts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'out_of_stock'>('all');

  const products = [
    {
      id: '1',
      name: 'Handcrafted Clay Pot',
      vendorName: 'Traditional Handicrafts',
      category: 'Pottery',
      price: 499,
      inStock: true,
      salesCount: 45,
      imageUrl: img1
    },
    {
      id: '2',
      name: 'Cotton Handloom Saree',
      vendorName: 'Handloom Textiles',
      category: 'Textiles',
      price: 2499,
      inStock: true,
      salesCount: 23,
      imageUrl: img1
    },
    {
      id: '3',
      name: 'Wooden Jewelry Box',
      vendorName: 'Traditional Handicrafts',
      category: 'Handicrafts',
      price: 899,
      inStock: false,
      salesCount: 12,
      imageUrl: img1
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && product.inStock) ||
                         (filter === 'out_of_stock' && !product.inStock);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    totalSales: products.reduce((sum, p) => sum + p.salesCount, 0)
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/admin')}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Manage Products</h1>
            <p className="text-xs text-muted-foreground">Review and manage products</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'active', 'out_of_stock'].map((status) => (
            <Badge
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              className="cursor-pointer capitalize whitespace-nowrap"
              onClick={() => setFilter(status as any)}
            >
              {status.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      </div>

      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Package className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Products</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-xs text-muted-foreground">In Stock</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <XCircle className="h-5 w-5 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold">{stats.outOfStock}</p>
              <p className="text-xs text-muted-foreground">Out of Stock</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <IndianRupee className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{stats.totalSales}</p>
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Button 
          className="w-full mb-6 h-12 gap-2"
          onClick={() => navigate('/admin/products/create')}
        >
          <Plus className="h-5 w-5" />
          Add New Product
        </Button>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-3 pr-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <Store className="h-3 w-3" />
                          <span>{product.vendorName}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {product.category}
                        </Badge>
                      </div>
                      <Badge 
                        variant={product.inStock ? 'default' : 'destructive'}
                        className="text-[10px]"
                      >
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>

                    {/* Price & Sales */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3 text-green-600" />
                        <span className="text-sm font-bold">₹{product.price}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {product.salesCount} sold
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs flex-1"
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs px-2"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-xs px-2 text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="p-8 text-center border-dashed">
            <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">No products found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your search or filter</p>
          </Card>
        )}
      </main>
    </div>
  );
}
