import { useEffect, useRef, useState } from "react";
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa"; // Import the reload icon
import { IoMdDownload } from "react-icons/io";

const AudioPlayer = ({ audiofile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    if (audiofile) {
      const audioArrayBuffer = audiofile.AudioStream.buffer;
      const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: "audio/mpeg" }));

      const audio = audioRef.current;
      audio.src = audioURL;

      // Set duration when audio metadata is loaded
      audio.addEventListener("loadeddata", () => {
        setDuration(audio.duration);
      });

      // Update progress bar on time update
      audio.addEventListener("timeupdate", updateProgressBar);

      return () => {
        URL.revokeObjectURL(audioURL);
      };
    }
  }, [audiofile]);

  const updateProgressBar = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100;

    setCurrentTime(audio.currentTime);
    progressBarRef.current.style.width = `${progress}%`; // Correct template literal usage
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const downloadAudio = () => {
    if (audiofile) {
      const audioArrayBuffer = audiofile.AudioStream.buffer;
      const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: "audio/mpeg" }));

      const a = document.createElement('a');
      a.href = audioURL;
      a.download = "audio.mp3";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(audioURL);
    }
  };



  return (
    <div className="audio-container">
      <audio ref={audioRef} />
      <div className="progress-container">
        <div
          ref={progressBarRef}
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }} // Corrected inline style
        />
      </div>
      <div className="button-container"> {/* Added container for buttons */}
        <button className="audio-btn" disabled={!audiofile} onClick={togglePlay}>
          {isPlaying ? <FaRegPauseCircle className="icon-btn" /> : <FaRegPlayCircle className="icon-btn" />}
        </button>
        <button className="audio-btn" disabled={!audiofile} onClick={downloadAudio}>
          <IoMdDownload className="icon-btn" />
        </button>
        
      </div>
    </div>
  );
};

export default AudioPlayer;
