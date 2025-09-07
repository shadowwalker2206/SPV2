import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";
import memory4 from "@/assets/memory4.jpg";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Beautiful memories together
  const photos = [
    { src: memory1, alt: "Memory 1", caption: "Laughing together - pure joy!" },
    { src: memory2, alt: "Memory 2", caption: "Golden hour selfie vibes ✨" },
    { src: memory3, alt: "Memory 3", caption: "Cafe conversations and coffee" },
    { src: memory4, alt: "Memory 4", caption: "Adventure buddies exploring" },
    { src: memory1, alt: "Memory 5", caption: "Making memories every day" },
    { src: memory2, alt: "Memory 6", caption: "Friendship goals achieved" },
    { src: memory3, alt: "Memory 7", caption: "Happy times captured" },
    { src: memory4, alt: "Memory 8", caption: "Forever friends forever" },
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
            className="celebration-card cursor-pointer group overflow-hidden aspect-square"
            onClick={() => openModal(index)}
          >
            <div className="relative w-full h-full">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              className="w-full h-full object-contain rounded-3xl"
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