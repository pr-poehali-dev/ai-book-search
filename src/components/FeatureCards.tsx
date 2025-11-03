import { Button } from '@/components/ui/button';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

function CategoryCard({ title, description, imageUrl, onClick }: CategoryCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-white p-6 space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Button 
          onClick={onClick}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-semibold uppercase"
        >
          Смотреть
        </Button>
      </div>
    </div>
  );
}

interface FeatureCardsProps {
  onCategoryClick: (category: string) => void;
}

export default function FeatureCards({ onCategoryClick }: FeatureCardsProps) {
  const categories = [
    {
      title: 'Отрывки о любви',
      description: 'Найдите вдохновляющие описания любви в литературных отрывках.',
      imageUrl: 'https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/ff2bec27-2ff8-428d-8700-90ebdb5e28ee.jpg',
      category: 'любовь'
    },
    {
      title: 'Отрывки о печали',
      description: 'Изучите литературные отрывки, передающие печаль и драматизм.',
      imageUrl: 'https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/5ef8a139-3317-4d4e-9846-977ca840fe40.jpg',
      category: 'печаль'
    },
    {
      title: 'Отрывки о приключениях',
      description: 'Откройте для себя захватывающие приключенческие истории.',
      imageUrl: 'https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/8f38074f-09d4-4652-8615-5928afa35b7e.jpg',
      category: 'приключение'
    },
    {
      title: 'Отрывки о природе',
      description: 'Насладитесь описаниями красоты природы в классике.',
      imageUrl: 'https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/55bdb859-0b11-4aa6-ae50-b8fce22aa505.jpg',
      category: 'природа'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8 mb-12">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.category}
          title={cat.title}
          description={cat.description}
          imageUrl={cat.imageUrl}
          onClick={() => onCategoryClick(cat.category)}
        />
      ))}
    </div>
  );
}