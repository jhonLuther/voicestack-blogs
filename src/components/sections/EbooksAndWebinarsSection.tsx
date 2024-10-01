import { Post } from "~/interfaces/post";
import Card from "../Card";
import { useState } from 'react';

interface EbooksAndWebinarsSection {
  ebooks: Post[];
  webinars: Post[];
  remainingPosts: Post[]; // Add this line for featured contents from homeSettings
}

const EbooksAndWebinarsSection = ({ ebooks, webinars, remainingPosts }: EbooksAndWebinarsSection) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const combi = [...ebooks, ...webinars,...remainingPosts];

  // Combine featured contents for the carousel
  const carouselItems = remainingPosts.slice(0, 3);

  // Remaining items
  const remainingEbooks = ebooks.filter(ebook => !remainingPosts.includes(ebook));
  const remainingWebinars = webinars.filter(webinar => !remainingPosts.includes(webinar));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Ebooks and Webinars</h2>
      
      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselItems.map((item) => (
              <div key={item._id} className="w-full flex-shrink-0">
                <Card post={item} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">←</button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow">→</button>
      </div>

      {/* Remaining Ebooks */}
      <div>
        <h3 className="text-xl font-semibold mb-2">More Ebooks</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {remainingEbooks.map(ebook => (
            <Card key={ebook._id} post={ebook} />
          ))}
        </div>
      </div>

      {/* Remaining Webinars */}
      <div>
        <h3 className="text-xl font-semibold mb-2">More Webinars</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {remainingWebinars.map(webinar => (
            <Card key={webinar._id} post={webinar} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EbooksAndWebinarsSection;