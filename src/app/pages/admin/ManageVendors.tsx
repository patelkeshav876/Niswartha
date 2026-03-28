import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  ArrowLeft, 
  Plus, 
  Store,
  MapPin,
  Phone,
  Package,
  Edit,
  Trash2,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  IndianRupee
} from 'lucide-react';
import { useNavigate } from 'react-router';

const img1 =
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=600';
const img2 =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600';

export function ManageVendors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');

  const vendors = [
    {
      id: '1',
      name: 'Traditional Handicrafts',
      location: 'Varanasi, UP',
      phone: '+91 9876543210',
      productsCount: 15,
      totalSales: 45000,
      donationContributed: 6750,
      status: 'active',
      imageUrl: img1
    },
    {
      id: '2',
      name: 'Handloom Textiles',
      location: 'Chanderi, MP',
      phone: '+91 9876543211',
      productsCount: 22,
      totalSales: 68000,
      donationContributed: 10200,
      status: 'active',
      imageUrl: img2
    },
    {
      id: '3',
      name: 'Clay Pottery Studio',
      location: 'Jaipur, RJ',
      phone: '+91 9876543212',
      productsCount: 0,
      totalSales: 0,
      donationContributed: 0,
      status: 'pending',
      imageUrl: img1
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || vendor.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    pending: vendors.filter(v => v.status === 'pending').length,
    totalDonations: vendors.reduce((sum, v) => sum + v.donationContributed, 0)
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
            <h1 className="text-lg font-bold">Manage Vendors</h1>
            <p className="text-xs text-muted-foreground">Approve and manage vendors</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Input
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'active', 'pending', 'inactive'].map((status) => (
            <Badge
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              className="cursor-pointer capitalize whitespace-nowrap"
              onClick={() => setFilter(status as any)}
            >
              {status}
            </Badge>
          ))}
        </div>
      </div>

      <main className="flex-1 p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Store className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Vendors</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <Clock className="h-5 w-5 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <IndianRupee className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">₹{(stats.totalDonations / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground">Donations</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Button */}
        <Button 
          className="w-full mb-6 h-12 gap-2"
          onClick={() => navigate('/admin/vendors/create')}
        >
          <Plus className="h-5 w-5" />
          Add Vendor Manually
        </Button>

        {/* Vendors List */}
        <div className="space-y-4">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-32 flex-shrink-0">
                    <img 
                      src={vendor.imageUrl} 
                      alt={vendor.name}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-3 pr-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{vendor.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>{vendor.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{vendor.phone}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={vendor.status === 'active' ? 'default' : vendor.status === 'pending' ? 'secondary' : 'outline'}
                        className="text-[10px]"
                      >
                        {vendor.status}
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <Package className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{vendor.productsCount}</span>
                        <span className="text-muted-foreground">products</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="font-medium">₹{(vendor.totalSales / 1000).toFixed(1)}k</span>
                        <span className="text-muted-foreground">sales</span>
                      </div>
                    </div>

                    {vendor.donationContributed > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded p-2 mb-3">
                        <p className="text-xs font-medium text-green-700">
                          Donated: ₹{vendor.donationContributed.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {vendor.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            className="h-7 text-xs flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs flex-1 text-destructive"
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {vendor.status === 'active' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs flex-1"
                            onClick={() => navigate(`/admin/vendors/edit/${vendor.id}`)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 text-xs px-2"
                            onClick={() => navigate(`/vendor/${vendor.id}`)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <Card className="p-8 text-center border-dashed">
            <Store className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">No vendors found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your search or filter</p>
          </Card>
        )}
      </main>
    </div>
  );
}
