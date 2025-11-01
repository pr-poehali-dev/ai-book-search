import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

interface ExcerptDialogProps {
  excerpt: Excerpt | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function ExcerptDialog({ 
  excerpt, 
  isOpen, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}: ExcerptDialogProps) {
  if (!excerpt) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Подробная информация</DialogTitle>
          <DialogDescription>
            Детали литературного отрывка
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-6 bg-muted/30 rounded-lg border-l-4 border-accent">
            <p className="text-lg leading-relaxed italic">
              "{excerpt.text}"
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Icon name="User" size={20} className="text-accent mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Автор</p>
                <p className="font-semibold text-lg">{excerpt.author}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="BookOpen" size={20} className="text-accent mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Произведение</p>
                <p className="font-semibold">{excerpt.work}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="Calendar" size={20} className="text-accent mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Год публикации</p>
                <p className="font-semibold">{excerpt.year}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="Tag" size={20} className="text-accent mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Тема</p>
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                  {excerpt.theme}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => onToggleFavorite(excerpt.id)}
              variant={isFavorite ? "default" : "outline"}
              className="flex-1"
            >
              <Icon 
                name="Heart" 
                size={20} 
                className={isFavorite ? "fill-white mr-2" : "mr-2"}
              />
              {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
