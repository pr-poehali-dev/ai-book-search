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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center">Поиск по цитатам</h2>
        <p className="text-center text-muted-foreground">
          Введите тему, эмоцию или ключевое слово для поиска подходящих отрывков
        </p>
        
        <div className="flex gap-2">
          <Input 
            placeholder="Например: любовь, одиночество, счастье..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Поиск...
              </>
            ) : (
              <>
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </>
            )}
          </Button>
        </div>

        {searchError && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            {searchError}
          </div>
        )}
      </div>

      {displayedExcerpts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Найдено результатов: {displayedExcerpts.length}
            </h3>
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
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-50" />
          <p>По вашему запросу ничего не найдено. Попробуйте другие слова.</p>
        </div>
      )}
    </div>
  );
}
