import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ExcerptCard from './ExcerptCard';

interface Excerpt {
  id: number;
  text: string;
  author: string;
  work: string;
  year: number;
  theme: string;
}

interface SearchTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isSearching: boolean;
  searchError: string;
  displayedExcerpts: Excerpt[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  setSelectedExcerpt: (excerpt: Excerpt) => void;
}

export default function SearchTab({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching,
  searchError,
  displayedExcerpts,
  favorites,
  toggleFavorite,
  setSelectedExcerpt
}: SearchTabProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12">
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-semibold">Найти цитату</h2>
        <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
          Введите эмоцию или тему
        </p>
        
        <div className="flex gap-3 max-w-xl mx-auto">
          <Input 
            placeholder="любовь, одиночество, счастье..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 h-12 text-base border-border"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="h-12 px-6"
          >
            {isSearching ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Поиск
              </>
            ) : (
              <>
                <Icon name="Search" size={18} className="mr-2" />
                Найти
              </>
            )}
          </Button>
        </div>

        {searchError && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
            {searchError}
          </div>
        )}
      </div>

      {displayedExcerpts.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-light">
              Найдено {displayedExcerpts.length} {displayedExcerpts.length === 1 ? 'цитата' : displayedExcerpts.length < 5 ? 'цитаты' : 'цитат'}
            </p>
          </div>
          <div className="grid gap-6">
            {displayedExcerpts.map(excerpt => (
              <ExcerptCard
                key={excerpt.id}
                excerpt={excerpt}
                isFavorite={favorites.includes(excerpt.id)}
                onToggleFavorite={toggleFavorite}
                onViewDetails={setSelectedExcerpt}
              />
            ))}
          </div>
        </div>
      )}

      {!isSearching && searchQuery && displayedExcerpts.length === 0 && !searchError && (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-40" />
          <p className="text-lg font-light">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}