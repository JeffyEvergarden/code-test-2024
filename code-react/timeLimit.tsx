import React, { useState, useEffect } from 'react';

// 定义组件属性接口
interface CountdownProps {
  seconds: number;
  onEnd?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ seconds, onEnd }) => {
  // 使用 state 管理剩余时间
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalId!); // 清除定时器
            onEnd?.(); // 触发结束回调
          }
          return Math.max(0, newTime); // 确保时间不会小于 0
        });
      }, 1000);
    }

    // 清除定时器
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timeLeft, onEnd]);

  return (
    <div>
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Countdown;
