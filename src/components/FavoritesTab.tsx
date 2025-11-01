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

interface FavoritesTabProps {
  favoriteExcerpts: Excerpt[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  setSelectedExcerpt: (excerpt: Excerpt) => void;
}

export default function FavoritesTab({
  favoriteExcerpts,
  favorites,
  toggleFavorite,
  setSelectedExcerpt
}: FavoritesTabProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Избранные цитаты</h2>
        <p className="text-muted-foreground">
          {favoriteExcerpts.length > 0 
            ? `Сохранено цитат: ${favoriteExcerpts.length}` 
            : 'Здесь будут храниться ваши любимые отрывки'}
        </p>
      </div>

      {favoriteExcerpts.length > 0 ? (
        <div className="grid gap-6">
          {favoriteExcerpts.map(excerpt => (
            <ExcerptCard
              key={excerpt.id}
              excerpt={excerpt}
              isFavorite={favorites.includes(excerpt.id)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={setSelectedExcerpt}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-muted-foreground text-lg">
            Вы еще не добавили ни одной цитаты в избранное
          </p>
        </div>
      )}
    </div>
  );
}
