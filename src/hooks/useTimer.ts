import { useEffect, useState, useRef } from 'react';

const useTimer = (interval :number) => {
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [pause, setPause] = useState(true);
  const [timer, setTimer] = useState(0);

  const resetTimer = () => {
    setStartDate(new Date().getTime());
  }
  /**
   * RESET the timer and start
   */
  const startTimer = () => {
    resetTimer();
    setPause(false);
  }

  useEffect(() => {
    if(!pause) {
      const timerInterval = setInterval(() => {
        setTimer(new Date().getTime() - startDate);
      }, interval);
  
      return () => clearInterval(timerInterval);
    }
  }, [startDate, pause]);

  return {timer, resetTimer, startTimer, setPause };
};

export default useTimer