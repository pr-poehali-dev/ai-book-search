import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onSearchClick: () => void;
}

export default function HeroSection({ onSearchClick }: HeroSectionProps) {
  return (
    <div className="text-center py-32 px-6">
      <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
        Поиск цитат<br />по эмоциям
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
        Тысячи отрывков из классической литературы. Введите эмоцию или тему — найдите идеальную цитату для вашего случая.
      </p>
      <Button 
        size="lg" 
        onClick={onSearchClick}
        className="text-base px-8 py-6 rounded-md hover:opacity-90 transition-opacity"
      >
        Начать поиск
        <Icon name="ArrowRight" size={18} className="ml-2" />
      </Button>
    </div>
  );
}