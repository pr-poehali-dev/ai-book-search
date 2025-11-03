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
    <Card className="hover:shadow-lg transition-all border border-border bg-white rounded-xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-foreground mb-4">
              "{excerpt.text}"
            </p>
            <div className="space-y-1">
              <p className="font-bold text-foreground">{excerpt.author}</p>
              <p className="text-sm text-muted-foreground">«{excerpt.work}», {excerpt.year}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(excerpt.id)}
            className="shrink-0 h-10 w-10"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold uppercase">
            {excerpt.theme}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="text-sm border-border hover:bg-muted rounded-lg"
          onClick={() => onViewDetails(excerpt)}
        >
          Подробнее
          <Icon name="ArrowRight" size={14} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}