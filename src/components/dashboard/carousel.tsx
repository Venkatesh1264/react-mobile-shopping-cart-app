import React, { PropsWithChildren } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Don't forget to import the CSS

// Define the type for your image data
interface CarouselItem {
  id: number;
  src: string;
  alt: string;
  legend: string;
}

const items: CarouselItem[] = [
  { id: 1, src: "https://www.gorefurbo.com/cdn/shop/collections/Refurbished_Mobile_Phones_1.jpg?v=1695978895", alt: "Sample 1", legend: "Legend 1" },
  { id: 2, src: "https://i.ytimg.com/vi/5iv_N1ft2VU/maxresdefault.jpg", alt: "Sample 2", legend: "Legend 2" },
  { id: 3,  src: "https://cdn.mos.cms.futurecdn.net/2So5eRJVYj5ctB3qhR4XTj.jpeg", alt: "Sample 3", legend: "Legend 3" },
];

const CarouselComponent: React.FC = () => {
  return (
    <div style={{ width: "90%", margin: "auto", height: "10%", paddingTop: '10px' }}>
      <Carousel 
        showArrows={true} 
        infiniteLoop={true} 
        useKeyboardArrows={true} 
        autoPlay={true}
        statusFormatter={(current, total) => `Slide ${current} of ${total}`}
        showThumbs={false}
      >
        {items.map((item) => (
          <div key={item.id}>
            <img src={item.src} alt={item.alt} style={{width: "100%", height: "400px"}}/>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;