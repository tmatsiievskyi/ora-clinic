import { ArrowLeft, ArrowRight } from "@/UI/Arrows";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  {
    src: "partners/amrita.png",
    alt: "Landscape 1",
    title: "Beautiful Mountain View",
  },
  {
    src: "partners/arsenal.jpg",
    alt: "Landscape 2",
    title: "Ocean Sunset",
  },
  {
    src: "partners/cali.png",
    alt: "Landscape 3",
    title: "Forest Path",
  },
  {
    src: "partners/csd.png",
    alt: "Landscape 4",
    title: "City Skyline",
  },
  {
    src: "partners/enshuria.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/ingo.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/itClub.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/knyaja.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/oranta.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/smart.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/tas.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/universalna.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
  {
    src: "partners/vuso.jpg",
    alt: "Landscape 5",
    title: "Desert Dunes",
  },
];

export const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateItemsPerView = () => {
      const newItemsPerView = window.innerWidth < 768 ? 2 : 3;
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    updateItemsPerView();

    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, images.length - itemsPerView);

  const itemWidth = 100 / itemsPerView;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative bg-white rounded-lg py-4 overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * itemWidth}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative px-1 sm:px-2"
              style={{ width: `${itemWidth}%` }}
            >
              <Image
                src={`/img/${image.src}`}
                width={1500}
                height={500}
                alt={"complex image"}
                style={{
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  objectFit: "contain",
                  borderRadius: "0.5rem",
                }}
                priority={true}
              />
            </div>
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 "
          aria-label="Previous image"
        >
          <ArrowLeft
            classNameArrow="w-14 h-14 text-lightShade"
            classNameWrapper=" cursor-pointer flex items-center rounded-lg justify-center h-[60px] w-[60px] bg-dark/30 z-40"
          />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 "
          aria-label="Next image"
        >
          <ArrowRight
            classNameArrow="w-14 h-14 text-lightShade"
            classNameWrapper="cursor-pointer flex items-center rounded-lg justify-center h-[60px] w-[60px] bg-dark/30 cursor-pointer z-40"
          />
        </button>
      </div>
    </div>
  );
};
