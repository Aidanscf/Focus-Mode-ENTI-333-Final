import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioUrl?: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current || !duration) return;
    const newTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="p-10 bg-card/95 backdrop-blur-sm shadow-xl shadow-primary/5 border-border/50">
      <div className="flex flex-col items-center gap-8">
        <h3 className="font-display font-medium text-xl text-muted-foreground">Guided Meditation</h3>
        
        <Button
          size="icon"
          variant="default"
          className="h-24 w-24 rounded-full shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          onClick={togglePlayPause}
          data-testid="button-play-pause"
        >
          {isPlaying ? (
            <Pause className="h-9 w-9" />
          ) : (
            <Play className="h-9 w-9 ml-1" />
          )}
        </Button>

        <div className="w-full space-y-3 max-w-sm">
          <Slider
            value={[progressPercent]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
            data-testid="slider-audio-progress"
          />
          <div className="flex justify-between text-sm text-muted-foreground font-mono px-1">
            <span data-testid="text-current-time">{formatTime(currentTime)}</span>
            <span data-testid="text-duration">{formatTime(duration)}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRestart}
          className="gap-2 text-muted-foreground"
          data-testid="button-restart"
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>

        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      </div>
    </Card>
  );
}
