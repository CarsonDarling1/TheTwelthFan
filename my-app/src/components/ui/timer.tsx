import { useState, useEffect } from "react";

interface TimerProps {
  onExpire: () => void;
}

const Timer = ({ onExpire }: TimerProps) => {
  const timerStart = 60000; // 1 minute in milliseconds
  const [timerValue, setTimer] = useState(timerStart);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          onExpire(); // Call when timer ends
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [onExpire]);

  // Convert milliseconds to mm:ss format
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex w-full overflow-hidden items-start justify-center p-4">
      <div className="text-3xl font-bold">{formatTime(timerValue)}</div>
    </div>
  );
};

export default Timer;
