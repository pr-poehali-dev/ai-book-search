import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20 mb-20">
      <Card className="border-border hover:border-primary/30 transition-all bg-white">
        <CardHeader className="pb-3">
          <Icon name="Sparkles" size={28} className="text-primary mb-3" />
          <CardTitle className="text-xl font-semibold">ИИ-поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-light leading-relaxed">
            Умный алгоритм понимает эмоциональный контекст и находит точные совпадения
          </p>
        </CardContent>
      </Card>

      <Card className="border-border hover:border-primary/30 transition-all bg-white">
        <CardHeader className="pb-3">
          <Icon name="Library" size={28} className="text-primary mb-3" />
          <CardTitle className="text-xl font-semibold">Обширная база</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-light leading-relaxed">
            Более 1400 отрывков из русской и мировой классики
          </p>
        </CardContent>
      </Card>

      <Card className="border-border hover:border-primary/30 transition-all bg-white">
        <CardHeader className="pb-3">
          <Icon name="Heart" size={28} className="text-primary mb-3" />
          <CardTitle className="text-xl font-semibold">Избранное</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-light leading-relaxed">
            Сохраняйте понравившиеся цитаты и возвращайтесь к ним в любое время
          </p>
        </CardContent>
      </Card>
    </div>
  );
}