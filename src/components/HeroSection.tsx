import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onSearchClick: () => void;
}

export default function HeroSection({ onSearchClick }: HeroSectionProps) {
  return (
    <div 
      className="text-center space-y-4 py-20 px-6 rounded-lg relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/ead7af91-81ea-4590-8438-450131726a8e.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10 space-y-4">
        <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Найди идеальную цитату
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
          Исследуй мир литературы через эмоциональный ИИ-поиск. 
          Введи тему — получи десятки отрывков из классических произведений.
        </p>
        <Button 
          size="lg" 
          onClick={onSearchClick}
          className="mt-6 text-lg px-8 bg-white text-primary hover:bg-white/90"
        >
          Начать поиск
          <Icon name="ArrowRight" size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
