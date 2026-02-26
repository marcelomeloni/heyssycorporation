import { HeroCarousel } from '@/components/HeroCarousel';

export default function HomePage() {
  return (
   
    <div className="flex-1 w-full min-w-0 min-h-[calc(100vh-90px)] flex flex-col">
      <HeroCarousel />
    </div>
  );
}