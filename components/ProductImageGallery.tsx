"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  src: string;
  alt: string;
  isVideo?: boolean;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const thumbnailsPerPage = 3;
  const maxStartIndex = Math.max(0, images.length - thumbnailsPerPage);

  const handlePrevThumbnails = () => {
    setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - 1));
  };

  const handleNextThumbnails = () => {
    setThumbnailStartIndex(Math.min(maxStartIndex, thumbnailStartIndex + 1));
  };

  const visibleThumbnails = images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + thumbnailsPerPage
  );

  const showNavigation = images.length > thumbnailsPerPage;

  return (
    <div>
      {/* Main Image */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="flex aspect-square items-center justify-center bg-white p-8">
          <div className="w-3/5 h-auto">
            {images[selectedIndex].isVideo ? (
              <video
                src={images[selectedIndex].src}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={300}
                height={450}
                className="w-full h-auto object-contain"
                priority={selectedIndex === 0}
              />
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery with Navigation */}
      <div className="mt-4 relative">
        <div className="grid grid-cols-3 gap-4">
          {visibleThumbnails.map((image, idx) => {
            const actualIndex = thumbnailStartIndex + idx;
            return (
              <div
                key={actualIndex}
                onClick={() => setSelectedIndex(actualIndex)}
                className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedIndex === actualIndex
                    ? "border-indigo-500 ring-2 ring-indigo-500/50"
                    : "border-gray-700 hover:border-indigo-500/50"
                }`}
              >
                <div className="flex aspect-square items-center justify-center bg-white p-2 relative">
                  <div className="w-3/5 h-auto">
                    {image.isVideo ? (
                      <>
                        <video
                          src={image.src}
                          muted
                          playsInline
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/60 rounded-full p-3">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={120}
                        height={180}
                        className="w-full h-auto object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            {/* Previous Arrow */}
            {thumbnailStartIndex > 0 && (
              <button
                onClick={handlePrevThumbnails}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Previous images"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next Arrow */}
            {thumbnailStartIndex < maxStartIndex && (
              <button
                onClick={handleNextThumbnails}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Next images"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="mt-3 text-center text-sm text-gray-400">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
