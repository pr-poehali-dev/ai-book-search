import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Excerpt {
  id: number;
  text: string;
  author: string;
  work: string;
  year: number;
  theme: string;
}

interface ExcerptCardProps {
  excerpt: Excerpt;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewDetails: (excerpt: Excerpt) => void;
}

export default function ExcerptCard({ excerpt, isFavorite, onToggleFavorite, onViewDetails }: ExcerptCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-foreground mb-3">
              "{excerpt.text}"
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{excerpt.author}</p>
              <p>«{excerpt.work}», {excerpt.year}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(excerpt.id)}
            className="shrink-0"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Tag" size={16} className="text-accent" />
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
            {excerpt.theme}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => onViewDetails(excerpt)}
        >
          <Icon name="BookOpen" size={16} className="mr-2" />
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
}
