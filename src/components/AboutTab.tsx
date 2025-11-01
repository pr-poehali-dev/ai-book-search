import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface SearchHistoryItem {
  query: string;
  result_count: number;
  searched_at: string;
}

interface AboutTabProps {
  searchHistory: SearchHistoryItem[];
}

export default function AboutTab({ searchHistory }: AboutTabProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">О проекте</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Книжная полка — это интеллектуальный сервис для поиска литературных цитат. 
          Используя современные технологии ИИ, мы помогаем находить именно те отрывки, 
          которые резонируют с вашим настроением и мыслями.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Icon name="Target" size={24} className="text-accent mb-2" />
            <CardTitle>Наша миссия</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Сделать классическую литературу доступнее и помочь людям находить 
              вдохновение в великих произведениях прошлого и настоящего.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Icon name="Zap" size={24} className="text-accent mb-2" />
            <CardTitle>Технологии</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Проект построен на современном стеке: React, TypeScript, 
              и использует AI для семантического поиска по базе литературных отрывков.
            </p>
          </CardContent>
        </Card>
      </div>

      {searchHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={24} />
              История поиска
            </CardTitle>
            <CardDescription>
              Последние запросы в системе
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchHistory.slice(0, 10).map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Search" size={16} className="text-muted-foreground" />
                    <span className="font-medium">{item.query}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.result_count} результатов</span>
                    <span>{new Date(item.searched_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
