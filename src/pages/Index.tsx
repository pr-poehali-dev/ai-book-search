import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Excerpt {
  id: number;
  text: string;
  author: string;
  work: string;
  year: number;
  theme: string;
}

interface SearchHistoryItem {
  query: string;
  result_count: number;
  searched_at: string;
}

const mockExcerpts: Excerpt[] = [
  {
    id: 1,
    text: "Любовь — это когда хочется петь и днем и ночью. Без гонорара и менеджера.",
    author: "Фаина Раневская",
    work: "Из дневников",
    year: 1965,
    theme: "любовь"
  },
  {
    id: 2,
    text: "Она вошла в его жизнь, как входят в дом, где живут давно: легко, без стука, сразу во все комнаты.",
    author: "Эрих Мария Ремарк",
    work: "Три товарища",
    year: 1936,
    theme: "любовь"
  },
  {
    id: 3,
    text: "Я тебя люблю — это значит, я желаю тебе добра.",
    author: "Лев Толстой",
    work: "Анна Каренина",
    year: 1877,
    theme: "любовь"
  },
  {
    id: 4,
    text: "Смерть каждого человека умаляет и меня, ибо я един со всем Человечеством.",
    author: "Джон Донн",
    work: "По ком звонит колокол",
    year: 1624,
    theme: "философия"
  },
  {
    id: 5,
    text: "В одиночестве человек — либо святой, либо дьявол.",
    author: "Роберт Бёртон",
    work: "Анатомия меланхолии",
    year: 1621,
    theme: "одиночество"
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('home');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [displayedExcerpts, setDisplayedExcerpts] = useState<Excerpt[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/4aba6001-9a18-46b0-b062-18e5fb5ae944', {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        setSearchHistory(data.history || []);
      }
    } catch (error) {
      console.error('Failed to load search history', error);
    }
  };

  const saveToHistory = async (query: string, resultCount: number) => {
    try {
      await fetch('https://functions.poehali.dev/4aba6001-9a18-46b0-b062-18e5fb5ae944', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, result_count: resultCount })
      });
      loadSearchHistory();
    } catch (error) {
      console.error('Failed to save search history');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setDisplayedExcerpts([]);
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      const response = await fetch('https://functions.poehali.dev/bb03b1c0-73c9-4e73-859b-16c135eb1710', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery })
      });
      
      if (!response.ok) {
        throw new Error('Ошибка поиска');
      }
      
      const data = await response.json();
      const excerpts = data.excerpts || [];
      setDisplayedExcerpts(excerpts);
      
      await saveToHistory(searchQuery, excerpts.length);
    } catch (error) {
      setSearchError('Не удалось выполнить поиск. Попробуйте позже.');
      setDisplayedExcerpts([]);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const favoriteExcerpts = mockExcerpts.filter(e => favorites.includes(e.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="BookOpen" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Книжная полка</h1>
            </div>
          </div>
        </div>
      </header>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="container mx-auto px-4 py-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Icon name="Home" size={16} />
            Главная
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Icon name="Search" size={16} />
            Поиск
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Icon name="Heart" size={16} />
            Избранное
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Icon name="Info" size={16} />
            О проекте
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8">
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
                  onClick={() => setCurrentTab('search')}
                  className="mt-6 text-lg px-8 bg-white text-primary hover:bg-white/90"
                >
                  Начать поиск
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>

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
                  <Icon name="Bookmark" size={32} className="text-accent mb-2" />
                  <CardTitle>Избранное</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Сохраняй понравившиеся цитаты и создавай личную коллекцию
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="search" className="animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-center">Поиск отрывков</h2>
              <p className="text-center text-muted-foreground">
                Введите тему или ключевые слова
              </p>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Например: описание любви, одиночество, счастье..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isSearching && handleSearch()}
                  className="text-lg py-6"
                  disabled={isSearching}
                />
                <Button onClick={handleSearch} size="lg" className="px-8" disabled={isSearching}>
                  {isSearching ? (
                    <Icon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    <Icon name="Search" size={20} />
                  )}
                </Button>
              </div>

              {searchError && (
                <p className="text-center text-red-500 text-sm">{searchError}</p>
              )}

              <div className="flex gap-2 flex-wrap justify-center">
                {['любовь', 'философия', 'одиночество', 'счастье', 'дружба', 'мудрость', 'страх'].map(theme => (
                  <Button
                    key={theme}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(theme);
                      handleSearch();
                    }}
                    disabled={isSearching}
                  >
                    {theme}
                  </Button>
                ))}
              </div>
            </div>

            {searchHistory.length > 0 && (
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="History" size={20} />
                    История поиска
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.slice(0, 5).map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(item.query);
                          handleSearch();
                        }}
                        className="text-xs"
                      >
                        {item.query} ({item.result_count})
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {isSearching ? (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground">
                    <Icon name="Loader2" size={48} className="mx-auto mb-4 animate-spin" />
                    <p>Ищем отрывки...</p>
                  </CardContent>
                </Card>
              ) : displayedExcerpts.length > 0 ? (
                <>
                  <p className="text-muted-foreground text-center">
                    Найдено отрывков: {displayedExcerpts.length}
                  </p>
                  {displayedExcerpts.map((excerpt) => (
                    <Card key={excerpt.id} className="animate-scale-in hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{excerpt.author}</CardTitle>
                            <CardDescription className="text-base">
                              {excerpt.work} ({excerpt.year})
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(excerpt.id)}
                          >
                            <Icon 
                              name="Heart" 
                              size={24} 
                              className={favorites.includes(excerpt.id) ? 'fill-red-500 text-red-500' : ''}
                            />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <blockquote className="text-lg italic text-foreground/90 border-l-4 border-accent pl-4">
                          "{excerpt.text}"
                        </blockquote>
                      </CardContent>
                      <CardFooter>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {excerpt.theme}
                        </span>
                      </CardFooter>
                    </Card>
                  ))}
                </>
              ) : searchQuery ? (
                <Card className="py-12">
                  <CardContent className="text-center text-muted-foreground">
                    <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>По вашему запросу ничего не найдено</p>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center">Избранные отрывки</h2>
            
            {favoriteExcerpts.length > 0 ? (
              <div className="space-y-4">
                {favoriteExcerpts.map((excerpt) => (
                  <Card key={excerpt.id} className="animate-scale-in hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{excerpt.author}</CardTitle>
                          <CardDescription className="text-base">
                            {excerpt.work} ({excerpt.year})
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(excerpt.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={24} 
                            className="fill-red-500 text-red-500"
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="text-lg italic text-foreground/90 border-l-4 border-accent pl-4">
                        "{excerpt.text}"
                      </blockquote>
                    </CardContent>
                    <CardFooter>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {excerpt.theme}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="py-12">
                <CardContent className="text-center text-muted-foreground space-y-4">
                  <Icon name="BookmarkX" size={48} className="mx-auto opacity-50" />
                  <p className="text-lg">У вас пока нет избранных отрывков</p>
                  <Button onClick={() => setCurrentTab('search')} variant="outline">
                    Перейти к поиску
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="about" className="animate-fade-in">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">О проекте</h2>
            
            <div 
              className="rounded-lg overflow-hidden mb-6"
              style={{
                backgroundImage: 'url(https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/606671fa-5b4b-48ee-86ef-e0c8eec3f792.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px'
              }}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Книжная полка</CardTitle>
                <CardDescription className="text-base">
                  ИИ-поисковик по отрывкам из книг и рассказов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Наш проект создан для тех, кто любит литературу и ищет вдохновение 
                  в словах великих писателей. Мы собрали обширную коллекцию отрывков 
                  из классических и современных произведений.
                </p>
                
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Sparkles" size={20} />
                    Возможности
                  </h3>
                  <ul className="space-y-2 pl-7">
                    <li>🔍 Умный поиск по эмоциональному контексту</li>
                    <li>📚 База отрывков из мировой литературы</li>
                    <li>❤️ Сохранение избранных цитат</li>
                    <li>🎯 Тематический поиск</li>
                    <li>📖 Указание источника каждого отрывка</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Target" size={20} />
                    Как пользоваться
                  </h3>
                  <ol className="space-y-2 pl-7 list-decimal">
                    <li>Перейдите в раздел "Поиск"</li>
                    <li>Введите тему или ключевые слова (например, "любовь", "одиночество")</li>
                    <li>Изучите найденные отрывки</li>
                    <li>Добавьте понравившиеся в избранное</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent">
              <CardContent className="pt-6">
                <p className="text-center text-foreground italic">
                  "Книги — это корабли мысли, странствующие по волнам времени и 
                  бережно несущие свой драгоценный груз от поколения к поколению."
                </p>
                <p className="text-center text-muted-foreground mt-2">
                  — Фрэнсис Бэкон
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}