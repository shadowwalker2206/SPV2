import { useState, useEffect } from "react";
import BirthdayHero from "@/components/BirthdayHero";
import PhotoGallery from "@/components/PhotoGallery";
import VideoGallery from "@/components/VideoGallery";
import MusicPlayer from "@/components/MusicPlayer";
import ConfettiEffect from "@/components/ConfettiEffect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Show confetti for 5 seconds when page loads
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showConfetti && <ConfettiEffect />}
      
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-celebration-soft via-celebration-glow/20 to-celebration-gold/30"></div>
      </div>

      <BirthdayHero />

      <main className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 celebration-card">
              <TabsTrigger value="photos" className="data-[state=active]:hero-button">
                📸 Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:hero-button">
                🎬 Videos  
              </TabsTrigger>
              <TabsTrigger value="music" className="data-[state=active]:hero-button">
                🎵 Music
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="space-y-8">
              <PhotoGallery />
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <VideoGallery />
            </TabsContent>

            <TabsContent value="music" className="space-y-8">
              <MusicPlayer />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;