'use client';
import { useState } from 'react';
import Image from 'next/image';

/**
 * ImageGallery component to display an image gallery with thumbnails and navigation.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.images - An array of image URLs to be displayed in the gallery.
 * @returns {JSX.Element} The rendered ImageGallery component.
 */
export default function ImageGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  /**
   * Navigate to the next image in the gallery.
   */
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  /**
   * Navigate to the previous image in the gallery.
   */
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  /**
   * Handle thumbnail click to display the selected image.
   *
   * @param {number} index - The index of the image to display.
   */
  const handleImageClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative">
      <Image 
        src={images[currentImage]} 
        alt="Product" 
        width={800} 
        height={600} 
        layout="responsive"
        objectFit="cover"
        className="rounded-lg shadow-md"
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage} 
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-300"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button 
            onClick={nextImage} 
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors duration-300"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            width={100} 
            height={100}
            objectFit="cover"
            className={`cursor-pointer rounded-md transition-transform duration-300 hover:scale-110 ${currentImage === index ? 'border-2 border-indigo-600' : 'border border-gray-300'}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
