import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

type UnsplashPhoto = {
  id: string;
  urls: {
    thumb: string;
    small: string;
    regular: string;
  };
};

type UnsplashSearchResponse = {
  results?: UnsplashPhoto[];
};

const UNSPLASH_KEY = (import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined)?.trim() ?? '';

export type ImageSearchPickerProps = {
  value: string;
  onChange: (url: string) => void;
  searchQuery?: string;
};

export function ImageSearchPicker({ value, onChange, searchQuery }: ImageSearchPickerProps) {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const hasKey = UNSPLASH_KEY.length > 0;

  useEffect(() => {
    if (!hasKey) {
      setResults([]);
      setFetchError(false);
      setLoading(false);
      return;
    }

    const effective = searchText.trim() || (searchQuery?.trim() ?? '');
    if (!effective) {
      setResults([]);
      setFetchError(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setFetchError(false);

    const timer = window.setTimeout(async () => {
      try {
        const url = `https://api.unsplash.com/search/photos?client_id=${encodeURIComponent(UNSPLASH_KEY)}&per_page=9&query=${encodeURIComponent(effective)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Unsplash request failed');
        const json = (await res.json()) as UnsplashSearchResponse;
        setResults(Array.isArray(json.results) ? json.results : []);
      } catch {
        setFetchError(true);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [hasKey, searchText, searchQuery]);

  return (
    <div className="space-y-3">
      {hasKey && (
        <>
          <div className="space-y-2">
            <Label htmlFor="image-search">Search images</Label>
            <Input
              id="image-search"
              placeholder="Search images..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div className="relative min-h-[120px]">
            {loading && (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
                <span className="sr-only">Loading images</span>
              </div>
            )}
            {!loading && fetchError && (
              <p className="text-sm text-destructive py-2">
                Could not load images, paste URL manually
              </p>
            )}
            {!loading && !fetchError && (
              <div className="grid grid-cols-3 gap-2 justify-items-center">
                {results.map((photo) => {
                  const selected = value === photo.urls.regular;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => onChange(photo.urls.regular)}
                      className={cn(
                        'relative h-[150px] w-full max-w-[150px] justify-self-center overflow-hidden rounded-lg border-2 bg-muted transition-colors',
                        selected
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-transparent hover:border-primary/40',
                      )}
                      aria-label="Select image"
                    >
                      <img
                        src={photo.urls.thumb}
                        alt=""
                        className="h-full w-full object-cover"
                        width={150}
                        height={150}
                      />
                      {selected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/35">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                            <Check className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {value ? (
        <div className="space-y-1">
          <Label>Selected preview</Label>
          <img
            src={value}
            alt=""
            className="h-40 w-full rounded-lg object-cover bg-muted"
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="image-url-manual">Or paste image URL</Label>
        <Input
          id="image-url-manual"
          placeholder="https://…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
