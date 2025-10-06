import { useState } from "react";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const videos = [
    { 
      src: "/public/hellorotated.mp4", 
      
      title: "Hello Guyz",
      thumbnail: "/thumbnails/thumbnail1.jpg",
      description: "" 
    },
    { 
      src: "/public/mockdrillrotated.mp4", 
      thumbnail: "/thumbnails/thumbnail2.jpg", 
      title: "Memory Lane",
      description: "Mock drill" 
    },
    { 
      src: "/public/netwalkeod.mp4", 
      thumbnail: "/thumbnails/thumbnail3.jpg", 
      title: "Khatron ke khiladi",
      description: "Being goofy together" 
    },
    { 
      src: "/public/tyreeod.mp4", 
      thumbnail: "/thumbnails/thumbnail4.jpg", 
      title: "Adventure Video",
      description: "Our mini adventure" 
    },
     { 
      src: "/public/ramen.mp4", 
      thumbnail: "/thumbnails/thumbnail5.jpg", 
      title: "Laugh out loud",
      description: "Hasi rukni nhi chahiye" 
    },
    { 
      src: "/public/maksad.mp4", 
      thumbnail: "/thumbnails/thumbnail6.jpg", 
      title: "Maksad"
    },
    { 
      src: "/public/tuchahiyefinal.mp4", 
      thumbnail: "/thumbnails/thumbnail7.jpg", 
      title: "Wholesome moments"
    },
     { 
      src: "/public/hercore.mp4", 
      thumbnail: "/thumbnails/thumbnail8.jpg", 
      title: "BACCHI FOR A REASON"
    },

  ];

  const openVideoModal = (index: number) => {
    setSelectedVideo(index);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="celebration-card cursor-pointer group overflow-hidden"
            onClick={() => openVideoModal(index)}
          >
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-celebration-primary ml-1" />
                </div>300
              </div>
              
              {/* Video info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                <p className="text-white/80 text-sm">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo !== null && (
        <div className="glass-modal" onClick={closeVideoModal}>
          <div className="relative max-w-5xl max-h-[80vh] w-full mx-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={closeVideoModal}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="celebration-card overflow-hidden">
              <video
                src={videos[selectedVideo].src}
                controls
                autoPlay
                className="max-h-[80vh] w-auto mx-auto object-contain"

                onClick={(e) => e.stopPropagation()}
              >
                Your browser does not support the video tag.
              </video>
              
              <div className="p-6 bg-white/90">
                <h3 className="text-2xl font-bold text-celebration-primary mb-2">
                  {videos[selectedVideo].title}
                </h3>
                <p className="text-foreground/70">
                  {videos[selectedVideo].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions for local videos */}
      <div className="celebration-card p-6 mt-8">
        <h3 className="text-xl font-semibold mb-3 text-celebration-primary"></h3>
        <p className="text-muted-foreground">
        </p>
      </div>
    </>
  );
};

export default VideoGallery;