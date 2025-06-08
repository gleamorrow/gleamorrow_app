// Timer logic for tracking and submitting focus time.
// Works with pause/resume/stop, saves data to localStorage and backend.

const handleStartPause = () => {
  const totalSeconds = selectedHours * 3600 + selectedMinutes * 60;

  if (status === 'running') {
    pause();  // pause active timer
  } else if (status === 'paused') {
    start(remaining); // resume from paused time
  } else if (totalSeconds > 0) {
    start(totalSeconds); // fresh start
    localStorage.setItem(`timer_start_${userId}`, Date.now().toString());
    localStorage.setItem(`timer_duration_${userId}`, totalSeconds.toString());
    setMinutesSubmitted(0);
  }
};

// On page unload, submit any unsent time
useEffect(() => {
  const handleBeforeUnload = () => {
    const startTimestamp = getStartTimestamp(userId);
    const fullMinutes = calculateElapsedMinutes(startTimestamp);
    const unsubmitted = fullMinutes - minutesSubmitted;

    if (unsubmitted > 0) {
      beaconSubmit(userId, unsubmitted); // submit silently
    }

    localStorage.removeItem(`timer_start_${userId}`);
    localStorage.removeItem(`timer_duration_${userId}`);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [minutesSubmitted, userId]);
