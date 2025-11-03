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
    <div className="max-w-4xl mx-auto space-y-12">
      <div 
        className="relative bg-cover bg-center text-white py-32 px-8 rounded-2xl overflow-hidden"
        style={{backgroundImage: 'url(https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/a261058e-36d0-4a9b-ad9a-cc4e6022de01.jpg)'}}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Начните поиск<br />литературных фрагментов
          </h2>
          <p className="text-lg leading-relaxed">
            Более сотни отрывков из книг зарубежных и российских писателей
          </p>
          
          <div className="space-y-4">
            <Input 
              placeholder="Введите запрос" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-14 text-base bg-white text-foreground border-0 rounded-xl"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-semibold uppercase"
            >
              {isSearching ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Поиск
                </>
              ) : (
                'Поиск'
              )}
            </Button>
          </div>

          {searchError && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-white text-sm">
              {searchError}
            </div>
          )}
        </div>
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