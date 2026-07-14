import HomeContentSection from '@pages/home/components/HomeContentSection';
import HomeFeaturedCardsSection from '@pages/home/components/HomeFeaturedCardsSection';
import HomeHeroSection from '@pages/home/components/HomeHeroSection';

const HomePage = () => {
  return (
    <div>
      <div className="bg-home-gradient">
        <HomeHeroSection />
        <HomeFeaturedCardsSection />
      </div>
      <HomeContentSection />
    </div>
  );
};

export default HomePage;
