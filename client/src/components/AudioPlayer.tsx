import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioUrl?: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Paused audio' : 'Playing audio');
  };

  const handleRestart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setProgress(0);
    console.log('Restarted audio');
  };

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center gap-6">
        <h3 className="font-display font-semibold text-xl">Guided Meditation</h3>
        
        <Button
          size="icon"
          variant="default"
          className="h-20 w-20 rounded-full"
          onClick={togglePlayPause}
          data-testid="button-play-pause"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8 ml-1" />
          )}
        </Button>

        <div className="w-full space-y-2">
          <Slider
            value={[progress]}
            onValueChange={(value) => setProgress(value[0])}
            max={100}
            step={1}
            className="w-full"
            data-testid="slider-audio-progress"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0:00</span>
            <span>10:00</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRestart}
          className="gap-2"
          data-testid="button-restart"
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>

        {audioUrl && <audio ref={audioRef} src={audioUrl} />}
      </div>
    </Card>
  );
}
