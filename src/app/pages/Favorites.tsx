import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Heart, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { mockAshrams } from '../data/mock';
import { api } from '../lib/api';
import { useUser } from '../context/UserContext';
import type { Ashram } from '../types';

export function Favorites() {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [ashrams, setAshrams] = useState<Ashram[]>(mockAshrams);

  const load = useCallback(async () => {
    if (!currentUser?.id) {
      setFavoriteIds([]);
      return;
    }
    try {
      const ids = await api.getFavorites(currentUser.id);
      setFavoriteIds(Array.isArray(ids) ? ids : []);
    } catch {
      setFavoriteIds([]);
    }
    try {
      const list = await api.getAshrams();
      if (list.length > 0) setAshrams(list);
    } catch {
      /* mock */
    }
  }, [currentUser?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const favoriteAshrams = ashrams.filter((a) => favoriteIds.includes(a.id));

  const removeFavorite = async (e: React.MouseEvent, ashramId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser?.id) return;
    try {
      await api.removeFavorite(currentUser.id, ashramId);
      setFavoriteIds((prev) => prev.filter((id) => id !== ashramId));
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <div className="bg-background sticky top-0 z-10 border-b p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="-ml-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Favorite Ashrams</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {favoriteAshrams.length > 0 ? (
          favoriteAshrams.map((ashram) => (
            <Link key={ashram.id} to={`/ashram/${ashram.id}`}>
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                <div className="h-40 w-full relative">
                  <img src={ashram.imageUrl} alt={ashram.name} className="h-full w-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    Verified NGO
                  </div>
                  <button
                    type="button"
                    className="absolute top-4 right-4 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    onClick={(e) => removeFavorite(e, ashram.id)}
                  >
                    <Heart className="h-5 w-5 text-destructive fill-current" />
                  </button>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-foreground font-serif">{ashram.name}</h2>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {ashram.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{ashram.description}</p>
                  <div className="flex gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs">Child Care</Badge>
                    <Badge variant="secondary" className="text-xs">Education</Badge>
                    <Badge variant="outline" className="text-xs ml-auto flex items-center gap-1">
                      Visit <ExternalLink className="h-3 w-3" />
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Start adding your favorite ashrams to easily keep track and support them.
            </p>
            <Button onClick={() => navigate('/explore')}>
              Explore Ashrams
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
