import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import SearchTab from '@/components/SearchTab';
import FavoritesTab from '@/components/FavoritesTab';
import AboutTab from '@/components/AboutTab';
import ExcerptDialog from '@/components/ExcerptDialog';

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
  const [selectedExcerpt, setSelectedExcerpt] = useState<Excerpt | null>(null);

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
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="BookOpen" size={28} className="text-primary" />
              <span className="text-2xl font-semibold text-foreground">Книжная полка</span>
            </div>
          </div>
        </div>
      </header>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="container mx-auto px-6 py-4">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-0 bg-muted/50 p-1">
          <TabsTrigger value="home" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Icon name="Home" size={16} />
            <span className="hidden sm:inline">Главная</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Icon name="Search" size={16} />
            <span className="hidden sm:inline">Поиск</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Icon name="Heart" size={16} />
            <span className="hidden sm:inline">Избранное</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Icon name="Info" size={16} />
            <span className="hidden sm:inline">О проекте</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-8">
            <HeroSection onSearchClick={() => setCurrentTab('search')} />
            <FeatureCards />
          </div>
        </TabsContent>

        <TabsContent value="search" className="animate-fade-in">
          <SearchTab
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isSearching={isSearching}
            searchError={searchError}
            displayedExcerpts={displayedExcerpts}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setSelectedExcerpt={setSelectedExcerpt}
          />
        </TabsContent>

        <TabsContent value="favorites" className="animate-fade-in">
          <FavoritesTab
            favoriteExcerpts={favoriteExcerpts}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setSelectedExcerpt={setSelectedExcerpt}
          />
        </TabsContent>

        <TabsContent value="about" className="animate-fade-in">
          <AboutTab searchHistory={searchHistory} />
        </TabsContent>
      </Tabs>

      <ExcerptDialog
        excerpt={selectedExcerpt}
        isOpen={!!selectedExcerpt}
        onClose={() => setSelectedExcerpt(null)}
        isFavorite={selectedExcerpt ? favorites.includes(selectedExcerpt.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}