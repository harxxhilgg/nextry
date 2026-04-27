"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function ImageCarousel() {
  const images = [
    "/carousel/minimal-one.jpeg",
    "/carousel/minimal-two.jpeg",
    "/carousel/minimal-three.jpeg",
    "/carousel/minimal-four.jpeg",
  ];

  return (
    <div className="w-full flex px-12 sm:px-16">
      <Carousel className="w-full max-w-70 sm:max-w-xs p-2">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-1177/2560 p-1 flex items-center justify-center">
                <Image
                  src={item}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover rounded-3xl shadow-lg select-none"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex cursor-pointer" />
        <CarouselNext className="hidden sm:flex cursor-pointer" />
      </Carousel>
    </div>
  );
}