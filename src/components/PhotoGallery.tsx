import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import memory1 from "/public/SOLO.jpg";
import memory2 from "/public/Snapchat-448112528.jpg";
import memory3 from "/public/Snapchat-876517789.jpg";
import memory4 from "/public/Snapchat-1031114895~2.jpg";
import memory5 from "/public/Snapchat-1372350616.jpg";
import memory6 from "/public/Snapchat-1447208194.jpg";
import memory7 from "/public/Snapchat-1704327385.jpg";
import memory8 from "/public/Snapchat-1922872982.jpg";
import { Caption } from "react-day-picker";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Beautiful memories together
  const photos = [
    { src: memory2, alt: "Memory 1", caption: "Memory 1"},
    { src: memory1, alt: "Memory 2", caption: "Memory 2"},
    { src: memory3, alt: "Memory 3", caption: "Memory 3"},
    { src: memory4, alt: "Memory 4", caption: "Memory 4"},
    { src: memory5, alt: "Memory 5", caption: "Memory 5"},
    { src: memory6, alt: "Memory 6", caption: "Memory 6"},
    { src: memory7, alt: "Memory 7", caption: "Memory 7"},
    { src: memory8, alt: "Memory 8", caption: "Memory 8"},
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            //className="celebration-card cursor-pointer group overflow-hidden aspect-square"
            className="celebration-card cursor-pointer group overflow-hidden aspect-[4/3]"
            onClick={() => openModal(index)}
          >
            <div className="relative w-full h-full">
              <img
                src={photo.src}
                alt={photo.alt}
               className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">{photo.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="glass-modal" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-[80vh] w-full mx-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <img
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              className="max-h-screen max-w-screen object-contain mx-auto rounded-3xl"

              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              <p className="text-center">{photos[selectedImage].caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;