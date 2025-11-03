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
    <Card className="hover:border-primary/30 transition-all border border-border bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-foreground mb-4 font-light">
              "{excerpt.text}"
            </p>
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">{excerpt.author}</p>
              <p className="text-muted-foreground font-light">«{excerpt.work}», {excerpt.year}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(excerpt.id)}
            className="shrink-0 h-9 w-9"
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={18} 
              className={isFavorite ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded bg-muted text-muted-foreground font-medium uppercase tracking-wide">
            {excerpt.theme}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm"
          className="text-sm hover:bg-muted"
          onClick={() => onViewDetails(excerpt)}
        >
          Подробнее
          <Icon name="ArrowRight" size={14} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}