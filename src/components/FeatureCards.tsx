import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <Icon name="Sparkles" size={32} className="text-accent mb-2" />
          <CardTitle>ИИ-поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Умный алгоритм понимает эмоциональный контекст и находит точные совпадения
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <Icon name="Library" size={32} className="text-accent mb-2" />
          <CardTitle>Обширная база</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Тысячи отрывков из классической и современной литературы
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <Icon name="Heart" size={32} className="text-accent mb-2" />
          <CardTitle>Избранное</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Сохраняй понравившиеся цитаты и возвращайся к ним в любое время
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
