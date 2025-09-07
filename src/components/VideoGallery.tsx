import { useState } from "react";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  
  // Sample videos - replace with actual video paths from local storage
  const videos = [
    { 
      src: "/path/to/video1.mp4", 
      thumbnail: "/api/placeholder/400/300", 
      title: "Fun Video 1",
      description: "Amazing moments captured" 
    },
    { 
      src: "/path/to/video2.mp4", 
      thumbnail: "/api/placeholder/400/300", 
      title: "Memory Lane",
      description: "Throwback to good times" 
    },
    { 
      src: "/path/to/video3.mp4", 
      thumbnail: "/api/placeholder/400/300", 
      title: "Silly Moments",
      description: "Being goofy together" 
    },
    { 
      src: "/path/to/video4.mp4", 
      thumbnail: "/api/placeholder/400/300", 
      title: "Adventure Video",
      description: "Our mini adventure" 
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
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-celebration-primary ml-1" />
                </div>
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
                className="w-full h-full object-contain"
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
        <h3 className="text-xl font-semibold mb-3 text-celebration-primary">📁 Add Your Videos</h3>
        <p className="text-muted-foreground">
          To add your own videos, place them in the public folder of this project and update the video paths in the VideoGallery component. 
          Supported formats: MP4, WebM, OGV.
        </p>
      </div>
    </>
  );
};

export default VideoGallery;