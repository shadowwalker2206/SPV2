import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample playlist - replace with actual audio file paths
  const playlist = [
    { title: "Sahiba", artist: "Jasleen Royal", src: "/path/to/sahiba.mp3" },
    { title: "Aur Mohabbat Kitni Karoon", artist: "Various Artists", src: "/path/to/mohabbat.mp3" },
    { title: "Qyade Se", artist: "Artist Name", src: "/path/to/qyade.mp3" },
    { title: "Tum Ho Toh", artist: "Armaan Malik", src: "/path/to/tumho.mp3" },
    { title: "Zamaana Laage", artist: "Various Artists", src: "/path/to/zamaana.mp3" },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const selectSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Song Display */}
      <div className="celebration-card p-8 text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-celebration-primary to-celebration-warm flex items-center justify-center floating-element">
          <div className="text-4xl">🎵</div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-celebration-primary">
          {playlist[currentSong].title}
        </h2>
        <p className="text-muted-foreground mb-6">
          {playlist[currentSong].artist}
        </p>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={playPrevious}
            className="hover:bg-celebration-soft"
          >
            <SkipBack className="h-6 w-6" />
          </Button>

          <Button
            size="icon"
            onClick={togglePlay}
            className="hero-button w-16 h-16"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={playNext}
            className="hover:bg-celebration-soft"
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 max-w-xs mx-auto">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={setVolume}
            className="flex-1"
          />
        </div>
      </div>

      {/* Playlist */}
      <div className="celebration-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-celebration-primary">🎵 Our Playlist</h3>
        <div className="space-y-2">
          {playlist.map((song, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                index === currentSong
                  ? 'bg-celebration-soft text-celebration-primary'
                  : 'hover:bg-muted'
              }`}
              onClick={() => selectSong(index)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === currentSong ? 'bg-celebration-primary text-white' : 'bg-muted'
                }`}>
                  {index === currentSong && isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="celebration-card p-6">
        <h3 className="text-xl font-semibold mb-3 text-celebration-primary">🎧 Add Your Music</h3>
        <p className="text-muted-foreground">
          To add your favorite songs, place your MP3 files in the public folder and update the playlist in the MusicPlayer component.
          Create the perfect soundtrack for your memories!
        </p>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={playlist[currentSong].src}
        onEnded={playNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;