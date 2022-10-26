import { useEffect, useState, useTransition } from 'react';

const useTimer = (interval :number) => {
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [pause, setPause] = useState(true);
  const [timer, setTimer] =
    useState(new Date().getTime() - startDate);

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
  const pauseTimer = () => {
    setPause(true);
  }
  const resumeTimer = () => {
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

  return {timer, resetTimer, startTimer, pauseTimer, resumeTimer};
};

export default useTimer