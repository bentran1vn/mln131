import { useEffect, useRef, useState } from "react";

const BackgroundMusic = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={toggleMusic}>
        {isPlaying ? (
          <div className="rounded-full bg-white/30 text-2xl h-12 w-12 text-white flex items-center justify-center">
            {">"}
          </div>
        ) : (
          <div className="rounded-full bg-white/30 text-2xl h-12 w-12 text-white flex items-center justify-center">
            {"="}
          </div>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
