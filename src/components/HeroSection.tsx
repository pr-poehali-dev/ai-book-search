interface HeroSectionProps {
  onSearchClick: () => void;
}

export default function HeroSection({ onSearchClick }: HeroSectionProps) {
  return (
    <div className="relative bg-cover bg-center text-white py-20 px-6 rounded-2xl overflow-hidden" 
         style={{backgroundImage: 'url(https://cdn.poehali.dev/projects/28118dcc-5ab5-4658-bc52-dbf901efbc4c/files/ead7af91-81ea-4590-8438-450131726a8e.jpg)'}}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Литературные отрывки
        </h1>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Наш сайт предоставляет сотни отрывков из книг, чтобы писатели могли вдохновиться и использовать их в своих работах.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <button 
            onClick={onSearchClick}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold uppercase transition-colors"
          >
            Поиск
          </button>
          <button 
            onClick={() => {}}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-semibold uppercase transition-colors"
          >
            Избранное
          </button>
        </div>
      </div>
    </div>
  );
}